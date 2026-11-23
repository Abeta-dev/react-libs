import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  AbetaContextGraph,
  AbetaKnowledgeBundle,
  AbetaRegistry,
  ContextGraphEdge,
  ContextGraphNode,
  RagChunk,
} from './types';

export const DEFAULT_REMOTE_BASE_URL = 'https://abeta-dev.github.io/react-libs';

function resolveDataDir(explicitDir?: string): string {
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- Caller-supplied optional knowledge directory
  if (explicitDir && existsSync(explicitDir)) {
    return explicitDir;
  }

  const here =
    typeof __dirname !== 'undefined'
      ? __dirname
      : dirname(fileURLToPath(import.meta.url));

  const candidates = [
    join(here, 'data'),
    resolve(here, '..', 'dist', 'data'),
    resolve(here, '..', '..', '..', 'public'),
    resolve(process.cwd(), 'public'),
  ];

  for (const dir of candidates) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Resolved from package-relative fixed candidates
    if (existsSync(join(dir, 'registry.json'))) {
      return dir;
    }
  }

  throw new Error(
    'Unable to locate bundled @abeta.dev/mcp knowledge files (registry.json, context-graph.json, rag-chunks.jsonl, llms.txt).'
  );
}

function readUtf8(dir: string, filename: 'registry.json' | 'context-graph.json' | 'rag-chunks.jsonl' | 'llms.txt'): string {
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- Fixed allow-listed data filenames under resolved package data dir
  return readFileSync(join(dir, filename), 'utf8');
}

export function parseRagJsonl(raw: string): RagChunk[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => JSON.parse(line) as RagChunk);
}

export function loadBundledKnowledge(dataDir?: string): AbetaKnowledgeBundle {
  const dir = resolveDataDir(dataDir);
  const registry = JSON.parse(readUtf8(dir, 'registry.json')) as AbetaRegistry;
  const contextGraph = JSON.parse(readUtf8(dir, 'context-graph.json')) as AbetaContextGraph;
  const ragChunks = parseRagJsonl(readUtf8(dir, 'rag-chunks.jsonl'));
  const llmsTxt = readUtf8(dir, 'llms.txt');
  return { registry, contextGraph, ragChunks, llmsTxt };
}

export async function loadRemoteKnowledge(baseUrl = DEFAULT_REMOTE_BASE_URL): Promise<AbetaKnowledgeBundle> {
  const base = baseUrl.replace(/\/$/, '');
  const [regRes, graphRes, chunksRes, llmsRes] = await Promise.all([
    fetch(`${base}/registry.json`),
    fetch(`${base}/context-graph.json`),
    fetch(`${base}/rag-chunks.jsonl`),
    fetch(`${base}/llms.txt`),
  ]);

  if (!regRes.ok || !graphRes.ok || !chunksRes.ok || !llmsRes.ok) {
    throw new Error(`Failed to fetch remote @abeta.dev knowledge artifacts from ${base}`);
  }

  return {
    registry: (await regRes.json()) as AbetaRegistry,
    contextGraph: (await graphRes.json()) as AbetaContextGraph,
    ragChunks: parseRagJsonl(await chunksRes.text()),
    llmsTxt: await llmsRes.text(),
  };
}

export function listPackages(bundle: AbetaKnowledgeBundle, includeDeprecated = true) {
  return bundle.registry.packages
    .filter((pkg) => includeDeprecated || !pkg.deprecated)
    .map((pkg) => ({
      name: pkg.name,
      version: pkg.version,
      deprecated: pkg.deprecated,
      role: pkg.role,
      install: `npm install ${pkg.name}`,
      subpaths: pkg.subpaths.map((s) => ({
        importPath: s.importPath,
        runtime: s.runtime,
        rscSafe: s.rscSafe,
        symbolCount: s.symbolCount,
      })),
      npmUrl: pkg.npmUrl,
      docsUrl: pkg.docsUrl,
    }));
}

export function lookupSymbol(bundle: AbetaKnowledgeBundle, query: string, limit = 15) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const matches: Array<{
    symbol: string;
    package: string;
    importPath: string;
    runtime: string;
    rscSafe: boolean;
    useClientRequired: boolean;
    deprecated: boolean;
    urn: string;
    exactMatch: boolean;
  }> = [];

  for (const pkg of bundle.registry.packages) {
    for (const sp of pkg.subpaths) {
      for (const sym of sp.symbols) {
        const lower = sym.toLowerCase();
        if (lower === needle || lower.includes(needle)) {
          matches.push({
            symbol: sym,
            package: pkg.name,
            importPath: sp.importPath,
            runtime: sp.runtime,
            rscSafe: sp.rscSafe,
            useClientRequired: sp.useClientRequired,
            deprecated: pkg.deprecated,
            urn: `urn:abeta:symbol:${pkg.name}:${sym}`,
            exactMatch: lower === needle,
          });
        }
      }
    }
  }

  matches.sort((a, b) => {
    if (a.exactMatch !== b.exactMatch) return a.exactMatch ? -1 : 1;
    if (a.deprecated !== b.deprecated) return a.deprecated ? 1 : -1;
    return a.symbol.length - b.symbol.length;
  });

  return matches.slice(0, Math.max(1, Math.min(limit, 50)));
}

export function checkRscBoundary(bundle: AbetaKnowledgeBundle, importPath: string) {
  const normalized = importPath.trim();
  for (const pkg of bundle.registry.packages) {
    for (const sp of pkg.subpaths) {
      if (sp.importPath === normalized) {
        let guidance: string;
        if (sp.runtime === 'rsc-universal') {
          guidance =
            'Safe to import directly in React Server Components, Node.js APIs, and Edge runtimes (zero client directive, zero DOM).';
        } else if (sp.runtime === 'browser-worker-client') {
          guidance =
            'Client-only browser worker module. Isolate behind dynamic import or a React client boundary; never evaluate in Node SSR.';
        } else if (sp.runtime === 'css') {
          guidance = `Stylesheet asset. Import in global CSS (@import "${sp.importPath}") or client app entry point.`;
        } else {
          guidance =
            'Requires a React Client Component boundary (useClientRequired: true). Safe for SSR hydration, but interactive hooks/DOM run on client.';
        }

        return {
          found: true,
          importPath: sp.importPath,
          package: pkg.name,
          runtime: sp.runtime,
          rscSafe: sp.rscSafe,
          useClientRequired: sp.useClientRequired,
          deprecatedPackage: pkg.deprecated,
          urn: `urn:abeta:subpath:${sp.importPath}`,
          guidance,
        };
      }
    }
  }

  return {
    found: false,
    importPath: normalized,
    guidance: `Import path "${normalized}" was not found in @abeta.dev registry v${bundle.registry.version}. Call abeta_list_packages to inspect valid subpaths.`,
  };
}

function scoreRagChunk(chunk: RagChunk, tokens: string[]): number {
  if (tokens.length === 0) return 1;
  const titleLower = chunk.title.toLowerCase();
  const symLower = chunk.symbols.join(' ').toLowerCase();
  const bodyLower = chunk.content.toLowerCase();
  const pkgLower = chunk.package.toLowerCase();

  let score = 0;
  for (const tok of tokens) {
    if (titleLower.includes(tok)) score += 6;
    if (symLower.includes(tok)) score += 5;
    if (pkgLower.includes(tok)) score += 4;
    if (bodyLower.includes(tok)) score += 2;
  }
  return score;
}

export function searchRagChunks(
  bundle: AbetaKnowledgeBundle,
  query: string,
  options: { packageName?: string | undefined; category?: string | undefined; limit?: number | undefined } = {}
) {
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9@._/-]+/)
    .filter((t) => t.length >= 2);
  const limit = Math.max(1, Math.min(options.limit ?? 5, 20));

  const scored: Array<{ score: number; chunk: RagChunk }> = [];
  for (const chunk of bundle.ragChunks) {
    if (options.packageName && chunk.package !== options.packageName) continue;
    if (options.category && chunk.category !== options.category) continue;

    const score = scoreRagChunk(chunk, tokens);
    if (score > 0) {
      scored.push({ score, chunk });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.chunk.id.localeCompare(b.chunk.id));

  return scored.slice(0, limit).map(({ score, chunk }) => ({
    score,
    id: chunk.id,
    urn: chunk.urn,
    package: chunk.package,
    subpath: chunk.subpath,
    runtime: chunk.runtime,
    category: chunk.category,
    title: chunk.title,
    url: chunk.url,
    source: chunk.source,
    sha256: chunk.sha256,
    content: chunk.content,
  }));
}

function findStartNode(nodes: ContextGraphNode[], nodeMap: Map<string, ContextGraphNode>, needle: string): ContextGraphNode | undefined {
  const direct = nodeMap.get(needle);
  if (direct) return direct;
  const lower = needle.toLowerCase();
  return nodes.find((n) => {
    const importPath = typeof n.importPath === 'string' ? n.importPath.toLowerCase() : '';
    const name = typeof n.name === 'string' ? n.name.toLowerCase() : '';
    return importPath === lower || name === lower || n.id.toLowerCase() === lower;
  });
}

function expandFrontier(
  edges: ContextGraphEdge[],
  frontier: Set<string>,
  visited: Set<string>,
  clampedMax: number,
  collectedEdges: ContextGraphEdge[]
): Set<string> {
  const nextFrontier = new Set<string>();
  for (const edge of edges) {
    const matchesSource = frontier.has(edge.source);
    const matchesTarget = frontier.has(edge.target);
    if (!matchesSource && !matchesTarget) continue;

    const other = matchesSource ? edge.target : edge.source;
    if (visited.size >= clampedMax && !visited.has(other)) continue;

    collectedEdges.push(edge);
    if (!visited.has(other)) {
      visited.add(other);
      nextFrontier.add(other);
    }
  }
  return nextFrontier;
}

export function traverseContextGraph(
  bundle: AbetaKnowledgeBundle,
  startKey: string,
  depth = 1,
  maxNodes = 40
) {
  const clampedDepth = Math.max(1, Math.min(depth, 2));
  const clampedMax = Math.max(5, Math.min(maxNodes, 100));
  const needle = startKey.trim();

  const nodeMap = new Map<string, ContextGraphNode>();
  for (const n of bundle.contextGraph.nodes) {
    nodeMap.set(n.id, n);
  }

  const startNode = findStartNode(bundle.contextGraph.nodes, nodeMap, needle);
  if (!startNode) {
    return {
      found: false,
      query: needle,
      message: `No node matched "${needle}". Pass a canonical URN (e.g. "urn:abeta:pkg:@abeta.dev/india") or importPath (e.g. "@abeta.dev/ui/pdf").`,
      nodes: [],
      edges: [],
    };
  }

  const visited = new Set<string>([startNode.id]);
  const collectedEdges: ContextGraphEdge[] = [];
  let frontier = new Set<string>([startNode.id]);

  for (let hop = 0; hop < clampedDepth && visited.size < clampedMax; hop++) {
    frontier = expandFrontier(bundle.contextGraph.edges, frontier, visited, clampedMax, collectedEdges);
  }

  const nodes = [...visited]
    .map((id) => nodeMap.get(id))
    .filter((n): n is ContextGraphNode => Boolean(n));

  return {
    found: true,
    rootNode: startNode,
    depth: clampedDepth,
    nodeCount: nodes.length,
    edgeCount: collectedEdges.length,
    nodes,
    edges: collectedEdges,
  };
}
