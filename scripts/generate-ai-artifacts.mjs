#!/usr/bin/env node
/**
 * scripts/generate-ai-artifacts.mjs
 *
 * Deterministically generates RAG-ready and Context-Graph-ready artifacts
 * published alongside Storybook on GitHub Pages (https://abeta-dev.github.io/react-libs/):
 *
 *   1. public/context-graph.json  — Typed JSON-LD / GraphRAG knowledge graph with stable URNs
 *                                   (packages -> subpaths -> exported symbols -> runtime boundaries
 *                                    -> peer dependencies -> deprecations -> ADRs -> skills -> examples).
 *   2. public/rag-chunks.jsonl    — Pre-chunked, URN-linked, SHA-256-stamped JSONL records ready for
 *                                   direct embedding into Pinecone, Weaviate, Qdrant, pgvector,
 *                                   LlamaIndex, LangChain, or GraphRAG pipelines.
 *   3. public/registry.json       — Compact machine-readable catalog of packages, subpaths, symbols,
 *                                   CSS delivery, skills, examples, deprecations, and AI endpoints.
 *
 * Usage:
 *   node scripts/generate-ai-artifacts.mjs          # Generate / update all 3 files
 *   node scripts/generate-ai-artifacts.mjs --check  # CI zero-drift verification mode
 */

import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const CHECK_MODE = process.argv.includes('--check');
const BASE_URL = 'https://abeta-dev.github.io/react-libs';
const REPO_BLOB_BASE = 'https://github.com/Abeta-dev/react-libs/blob/main';

const PACKAGE_DEFS = [
  {
    key: 'ui',
    dir: 'packages/ui',
    manifest: 'packages/ui/package.json',
    readme: 'packages/ui/README.md',
    skill: 'skills/react-libs-ui/SKILL.md',
    role: 'Primary accessible React 18/19 + Tailwind CSS v4 + Radix UI design system (111 primitives, dual CSS delivery, isolated ./pdf viewer, 18 leaf micro-bundles).',
    barrels: [
      { subpath: '.', file: 'packages/ui/src/index.ts' },
      { subpath: './utils', file: 'packages/ui/src/utils.ts' },
      { subpath: './pdf', file: 'packages/ui/src/data-display/pdf-viewer.tsx' },
      { subpath: './hooks/use-toast', file: 'packages/ui/src/hooks/use-toast.ts' },
    ],
  },
  {
    key: 'india',
    dir: 'packages/india',
    manifest: 'packages/india/package.json',
    readme: 'packages/india/README.md',
    skill: 'skills/react-libs-india/SKILL.md',
    role: 'Zero-bloat India statutory compliance engine (GSTIN, PAN, IFSC, FSSAI, Pincode, GST split, TDS, Lakhs/Crores, NPCI UPI URIs) with optional React FinTech standee cards.',
    barrels: [
      { subpath: '.', file: 'packages/india/src/index.ts' },
      { subpath: './react', file: 'packages/india/src/react/index.ts' },
    ],
  },
  {
    key: 'talent',
    dir: 'packages/talent',
    manifest: 'packages/talent/package.json',
    readme: 'packages/talent/README.md',
    skill: 'skills/react-libs-talent/SKILL.md',
    role: 'Talent assessment, verifiable credentials, print-optimized ProofOfWorkCertificate, CheckpointRunner, DiagnosticQuiz, and hiring pipeline UI.',
    barrels: [{ subpath: '.', file: 'packages/talent/src/index.ts' }],
  },
  {
    key: 'auth',
    dir: 'packages/auth',
    manifest: 'packages/auth/package.json',
    readme: 'packages/auth/README.md',
    skill: 'skills/react-libs-auth/SKILL.md',
    role: 'Security-first headless AuthClient (HttpOnly cookie refresh mutex, CSRF, cross-tab sync, createAuthenticatedFetch) plus React bindings and auth UI forms.',
    barrels: [
      { subpath: '.', file: 'packages/auth/src/index.ts' },
      { subpath: './core', file: 'packages/auth/src/core/index.ts' },
      { subpath: './react', file: 'packages/auth/src/react.ts' },
      { subpath: './core/use-click-backpressure', file: 'packages/auth/src/core/use-click-backpressure.ts' },
    ],
  },
  {
    key: 'analytics',
    dir: 'packages/analytics',
    manifest: 'packages/analytics/package.json',
    readme: 'packages/analytics/README.md',
    skill: 'skills/react-libs-analytics/SKILL.md',
    role: 'Zero-bloat behavioral analytics engine with pluggable adapters (Console, HTTP, Google Analytics, Mixpanel), automatic PII sanitization, offline batching, and optional React 18/19 hooks.',
    barrels: [
      { subpath: '.', file: 'packages/analytics/src/index.ts' },
      { subpath: './react', file: 'packages/analytics/src/react/index.ts' },
    ],
  },
  {
    key: 'mcp',
    dir: 'packages/mcp',
    manifest: 'packages/mcp/package.json',
    readme: 'packages/mcp/README.md',
    skill: 'skills/react-libs-mcp/SKILL.md',
    role: 'Zero-dependency stdio Model Context Protocol (MCP) server and programmatic query SDK for live symbol lookup, RSC boundary checking, RAG search, and JSON-LD context graph traversal.',
    barrels: [{ subpath: '.', file: 'packages/mcp/src/index.ts' }],
  },
  {
    key: 'react-libs',
    dir: '.',
    manifest: 'package.json',
    readme: 'README.md',
    skill: 'skills/react-libs/SKILL.md',
    role: 'Legacy backward-compatible omnibus package re-exporting UI, India, Talent, Auth, and Analytics subpaths (deprecated for greenfield apps; scheduled sunset v1.0.0).',
    barrels: [
      { subpath: './analytics', file: 'src/lib/analytics/index.ts' },
      { subpath: './analytics/react', file: 'src/lib/analytics/react/index.ts' },
      { subpath: './utils', file: 'src/utils.ts' },
    ],
  },
];

function sha256(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex').slice(0, 16);
}

function readJson(rel) {
  return JSON.parse(readFileSync(join(ROOT, rel), 'utf8'));
}

function inferSubpathRuntime(pkgName, subpath) {
  if (subpath.endsWith('.css')) return 'css';
  if (subpath === './pdf') return 'browser-worker-client';
  if (
    subpath === './utils' ||
    subpath === './core' ||
    subpath === './analytics' ||
    (pkgName === '@abeta.dev/india' && subpath === '.') ||
    (pkgName === '@abeta.dev/analytics' && subpath === '.') ||
    (pkgName === '@abeta.dev/mcp' && subpath === '.') ||
    (pkgName === '@abeta.dev/react-libs' && subpath === './india')
  ) {
    return 'rsc-universal';
  }
  return 'client';
}

function extractExportedSymbols(relFile, visited = new Set()) {
  const abs = join(ROOT, relFile);
  if (!existsSync(abs) || visited.has(abs)) return [];
  visited.add(abs);
  const content = readFileSync(abs, 'utf8');
  const symbols = new Set();

  // Named re-exports: export { Foo, Bar as Baz, type Qux } from '...'
  const braceStartRe = /\bexport\s+\{|\bexport\s+type\s+\{/g;
  while (braceStartRe.exec(content) !== null) {
    const endIdx = content.indexOf('}', braceStartRe.lastIndex);
    if (endIdx === -1) break;
    const block = content.slice(braceStartRe.lastIndex, endIdx);
    braceStartRe.lastIndex = endIdx + 1;
    for (const part of block.split(',')) {
      const noLineComment = part.split('//')[0];
      const cleaned = noLineComment
        .replace(/\/\*[^*]*\*\//g, '')
        .trim()
        .replace(/^type\s+/, '')
        .trim();
      if (!cleaned) continue;
      const aliasParts = cleaned.split(/\s+as\s+/);
      const name = (aliasParts[1] || aliasParts[0]).trim();
      if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name)) {
        symbols.add(name);
      }
    }
  }

  // Direct declarations: export function Foo / export const Foo / export class Foo
  let m;
  const declRe = /export\s+(?:async\s+function|function|const|class|interface|type)\s+([A-Za-z_$][A-Za-z0-9_$]*)/g;
  while ((m = declRe.exec(content)) !== null) {
    symbols.add(m[1]);
  }

  // Star re-exports: export * from './validators'
  const starRe = /export\s+\*\s+from\s+['"](\.[^'"]+)['"]/g;
  while ((m = starRe.exec(content)) !== null) {
    const dir = relFile.includes('/') ? relFile.slice(0, relFile.lastIndexOf('/')) : '.';
    const targetBase = join(dir, m[1]);
    for (const candidate of [`${targetBase}.ts`, `${targetBase}.tsx`, `${targetBase}/index.ts`, `${targetBase}/index.tsx`]) {
      if (existsSync(join(ROOT, candidate))) {
        for (const sym of extractExportedSymbols(candidate, visited)) {
          symbols.add(sym);
        }
        break;
      }
    }
  }

  return [...symbols].sort();
}

function parseFrontmatter(md) {
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(md);
  if (!fm) return {};
  const out = {};
  for (const line of fm[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (k && v) out[k] = v;
  }
  return out;
}

function splitMarkdownSections(md, minChars = 120) {
  const clean = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
  const lines = clean.split(/\r?\n/);
  const sections = [];
  let currentTitle = 'Overview';
  let buffer = [];

  for (const line of lines) {
    const h2 = /^##\s+(.+)$/.exec(line);
    if (h2) {
      const body = buffer.join('\n').trim();
      if (body.length >= minChars) {
        sections.push({ title: currentTitle, content: body });
      }
      currentTitle = h2[1].replace(/[`*_#]/g, '').trim();
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  const tail = buffer.join('\n').trim();
  if (tail.length >= minChars) {
    sections.push({ title: currentTitle, content: tail });
  }
  return sections;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

function buildArtifacts() {
  const rootPkg = readJson('package.json');
  const version = rootPkg.version;
  const deprecations = readJson('deprecations.json');

  const nodes = [];
  const edges = [];
  const nodeIds = new Set();
  const edgeKeys = new Set();

  function addNode(node) {
    if (nodeIds.has(node.id)) return;
    nodeIds.add(node.id);
    nodes.push(node);
  }

  function addEdge(source, target, relation, metadata = {}) {
    const key = `${source}|${relation}|${target}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    edges.push({ source, target, relation, ...metadata });
  }

  const ecosystemUrn = 'urn:abeta:ecosystem:react-libs';
  addNode({
    id: ecosystemUrn,
    type: 'Ecosystem',
    label: '@abeta.dev React Ecosystem',
    version,
    homepage: `${BASE_URL}/`,
    repository: 'https://github.com/Abeta-dev/react-libs',
    aiEndpoints: {
      llmsTxt: `${BASE_URL}/llms.txt`,
      llmsFullTxt: `${BASE_URL}/llms-full.txt`,
      contextGraph: `${BASE_URL}/context-graph.json`,
      ragChunks: `${BASE_URL}/rag-chunks.jsonl`,
      registry: `${BASE_URL}/registry.json`,
    },
  });

  const registryPackages = [];
  const ragChunks = [];

  function pushChunk(chunk) {
    const content = chunk.content.trim();
    if (!content) return;
    ragChunks.push({
      id: chunk.id,
      urn: chunk.urn,
      version,
      package: chunk.package,
      subpath: chunk.subpath ?? null,
      runtime: chunk.runtime ?? 'documentation',
      category: chunk.category,
      title: chunk.title,
      url: chunk.url,
      source: chunk.source,
      symbols: chunk.symbols ?? [],
      content,
      sha256: sha256(`${chunk.id}|${version}|${content}`),
    });
  }

  // 1. Packages, Subpaths, Symbols, Peers, Skills
  for (const def of PACKAGE_DEFS) {
    const pkg = readJson(def.manifest);
    const pkgUrn = `urn:abeta:pkg:${pkg.name}`;
    const exportsMap = pkg.exports || {};
    const subpaths = [];
    const symbolMap = {};

    for (const barrel of def.barrels) {
      symbolMap[barrel.subpath] = extractExportedSymbols(barrel.file);
    }

    const peerMeta = pkg.peerDependenciesMeta || {};
    const peerDeps = Object.entries(pkg.peerDependencies || {}).map(([name, range]) => ({
      name,
      range,
      optional: Boolean(peerMeta[name]?.optional),
    }));

    addNode({
      id: pkgUrn,
      type: 'Package',
      name: pkg.name,
      version: pkg.version,
      deprecated: Boolean(pkg.deprecated),
      deprecationNotice: pkg.deprecated || null,
      description: pkg.description,
      role: def.role,
      directory: def.dir,
      keywords: pkg.keywords || [],
      engines: pkg.engines || {},
      npmUrl: `https://www.npmjs.com/package/${pkg.name}`,
      githubPackagesName: pkg.name.replace(/^@abeta\.dev\//, '@abeta-dev/'),
      docsUrl: `${REPO_BLOB_BASE}/${def.readme}`,
    });
    addEdge(ecosystemUrn, pkgUrn, 'contains_package');

    for (const [subpath, target] of Object.entries(exportsMap)) {
      const importPath = subpath === '.' ? pkg.name : `${pkg.name}/${subpath.slice(2)}`;
      const runtime = inferSubpathRuntime(pkg.name, subpath);
      const subpathUrn = `urn:abeta:subpath:${importPath}`;
      const exportedSymbols = symbolMap[subpath] || [];

      subpaths.push({
        subpath,
        importPath,
        runtime,
        useClientRequired: runtime === 'client' || runtime === 'browser-worker-client',
        rscSafe: runtime === 'rsc-universal',
        target,
        symbolCount: exportedSymbols.length,
        symbols: exportedSymbols,
      });

      addNode({
        id: subpathUrn,
        type: 'Subpath',
        package: pkg.name,
        subpath,
        importPath,
        runtime,
        rscSafe: runtime === 'rsc-universal',
        useClientRequired: runtime === 'client' || runtime === 'browser-worker-client',
        symbolCount: exportedSymbols.length,
      });
      addEdge(pkgUrn, subpathUrn, 'exports_subpath', { runtime });

      // Add high-signal exported symbols (value exports — uppercase components or camelCase API functions)
      const valueSymbols = exportedSymbols.filter(
        (s) => !s.endsWith('Props') && !s.endsWith('Options') && !s.endsWith('Result') && !s.endsWith('Config')
      );
      for (const sym of valueSymbols) {
        const symUrn = `urn:abeta:symbol:${pkg.name}:${sym}`;
        addNode({
          id: symUrn,
          type: 'Symbol',
          name: sym,
          package: pkg.name,
          importPath,
          runtime,
          rscSafe: runtime === 'rsc-universal',
        });
        addEdge(subpathUrn, symUrn, 'exports_symbol');
      }
    }

    // Internal @abeta.dev dependencies
    for (const [depName, range] of Object.entries(pkg.dependencies || {})) {
      if (depName.startsWith('@abeta.dev/')) {
        addEdge(pkgUrn, `urn:abeta:pkg:${depName}`, 'depends_on', { range });
      }
    }
    for (const peer of peerDeps) {
      if (peer.name.startsWith('@abeta.dev/')) {
        addEdge(pkgUrn, `urn:abeta:pkg:${peer.name}`, peer.optional ? 'optional_peer' : 'requires_peer', {
          range: peer.range,
        });
      }
    }

    // Portable Agent Skill node
    if (def.skill && existsSync(join(ROOT, def.skill))) {
      const skillRaw = readFileSync(join(ROOT, def.skill), 'utf8');
      const fm = parseFrontmatter(skillRaw);
      const skillUrn = `urn:abeta:skill:${fm.name || def.key}`;
      addNode({
        id: skillUrn,
        type: 'AgentSkill',
        name: fm.name || `react-libs-${def.key}`,
        description: fm.description || '',
        path: def.skill,
        url: `${REPO_BLOB_BASE}/${def.skill}`,
      });
      addEdge(skillUrn, pkgUrn, 'skill_covers');

      pushChunk({
        id: `skill-${slugify(fm.name || def.key)}`,
        urn: skillUrn,
        package: pkg.name,
        subpath: '.',
        runtime: 'documentation',
        category: 'agent-skill',
        title: `AI Agent Skill: ${fm.name || def.key}`,
        url: `${REPO_BLOB_BASE}/${def.skill}`,
        source: def.skill,
        symbols: Object.values(symbolMap).flat().slice(0, 40),
        content: skillRaw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim(),
      });
    }

    // Package overview + subpath contract chunk for RAG
    const subpathLines = subpaths.map(
      (s) =>
        `- \`${s.importPath}\` [runtime: ${s.runtime}, rscSafe: ${s.rscSafe}]${
          s.symbolCount > 0 ? ` — exports (${s.symbolCount}): ${s.symbols.slice(0, 20).join(', ')}${s.symbolCount > 20 ? ', ...' : ''}` : ''
        }`
    );
    pushChunk({
      id: `pkg-${def.key}-contract`,
      urn: pkgUrn,
      package: pkg.name,
      subpath: '.',
      runtime: pkg.name === '@abeta.dev/india' ? 'rsc-universal' : 'client',
      category: 'package-contract',
      title: `${pkg.name}@${pkg.version} — Package Contract, Subpaths & Runtime Boundaries`,
      url: `${REPO_BLOB_BASE}/${def.readme}`,
      source: def.manifest,
      symbols: Object.values(symbolMap).flat(),
      content: [
        `Package: ${pkg.name}@${pkg.version}`,
        `Role: ${def.role}`,
        pkg.deprecated ? `Deprecation Notice: ${pkg.deprecated}` : 'Status: Active modular scoped package',
        `Install: npm install ${pkg.name}`,
        `Peer Dependencies: ${peerDeps.map((p) => `${p.name}@${p.range}${p.optional ? ' (optional)' : ''}`).join(', ') || 'none'}`,
        '',
        'Exported Subpaths & Runtime Boundaries:',
        ...subpathLines,
      ].join('\n'),
    });

    // Chunk package README sections for rich recipe retrieval
    if (def.key !== 'react-libs' && existsSync(join(ROOT, def.readme))) {
      const readmeMd = readFileSync(join(ROOT, def.readme), 'utf8');
      for (const sec of splitMarkdownSections(readmeMd, 160)) {
        pushChunk({
          id: `readme-${def.key}-${slugify(sec.title)}`,
          urn: pkgUrn,
          package: pkg.name,
          subpath: '.',
          runtime: pkg.name === '@abeta.dev/india' ? 'rsc-universal' : 'client',
          category: 'package-guide',
          title: `${pkg.name} — ${sec.title}`,
          url: `${REPO_BLOB_BASE}/${def.readme}`,
          source: def.readme,
          symbols: Object.values(symbolMap).flat().slice(0, 25),
          content: sec.content.slice(0, 2800),
        });
      }
    }

    registryPackages.push({
      name: pkg.name,
      version: pkg.version,
      deprecated: Boolean(pkg.deprecated),
      description: pkg.description,
      role: def.role,
      directory: def.dir,
      npmUrl: `https://www.npmjs.com/package/${pkg.name}`,
      githubPackagesName: pkg.name.replace(/^@abeta\.dev\//, '@abeta-dev/'),
      docsUrl: `${REPO_BLOB_BASE}/${def.readme}`,
      skillPath: def.skill,
      peerDependencies: peerDeps,
      subpaths: subpaths.map((s) => ({
        subpath: s.subpath,
        importPath: s.importPath,
        runtime: s.runtime,
        useClientRequired: s.useClientRequired,
        rscSafe: s.rscSafe,
        symbolCount: s.symbolCount,
        symbols: s.symbols,
      })),
    });
  }

  // 2. Deprecation & Sunset Windows
  for (const dep of deprecations.entries || []) {
    const depUrn = `urn:abeta:deprecation:${dep.id}`;
    addNode({
      id: depUrn,
      type: 'DeprecationWindow',
      label: dep.symbol,
      scope: dep.scope,
      deprecatedSince: dep.deprecatedSince,
      removeIn: dep.removeIn,
      status: dep.status,
      replacement: dep.replacement,
      migrationDoc: `${REPO_BLOB_BASE}/${dep.migrationDoc}`,
    });
    addEdge(ecosystemUrn, depUrn, 'enforces_deprecation');
    if (dep.symbol === '@abeta.dev/react-libs') {
      addEdge('urn:abeta:pkg:@abeta.dev/react-libs', depUrn, 'has_deprecation_window');
      for (const targetPkg of ['@abeta.dev/ui', '@abeta.dev/india', '@abeta.dev/talent', '@abeta.dev/auth']) {
        addEdge('urn:abeta:pkg:@abeta.dev/react-libs', `urn:abeta:pkg:${targetPkg}`, 'deprecated_in_favor_of', {
          removeIn: dep.removeIn,
        });
      }
    }
  }

  pushChunk({
    id: 'policy-deprecation-windows',
    urn: 'urn:abeta:deprecation:omnibus-react-libs-package',
    package: '@abeta.dev/react-libs',
    subpath: null,
    runtime: 'documentation',
    category: 'governance-policy',
    title: 'Strict Deprecation Windows & Sunset Policy',
    url: `${REPO_BLOB_BASE}/deprecations.json`,
    source: 'deprecations.json',
    symbols: (deprecations.entries || []).map((e) => e.symbol),
    content: [
      deprecations.policy?.description || '',
      '',
      ...(deprecations.entries || []).map(
        (e) =>
          `- ${e.symbol} [${e.scope}, status=${e.status}]: deprecated since v${e.deprecatedSince}, scheduled removal v${e.removeIn}. Replace with: ${e.replacement} (${e.migrationDoc}).`
      ),
    ].join('\n'),
  });

  // 3. Architecture Decision Records (ADRs)
  const adrDir = join(ROOT, 'docs', 'adr');
  const adrList = [];
  if (existsSync(adrDir)) {
    for (const file of readdirSync(adrDir).filter((f) => f.endsWith('.md')).sort()) {
      const rel = `docs/adr/${file}`;
      const raw = readFileSync(join(ROOT, rel), 'utf8');
      const titleMatch = /^#\s+(.+)$/m.exec(raw);
      const title = titleMatch ? titleMatch[1].trim() : basename(file, '.md');
      const idNum = file.slice(0, 4);
      const adrUrn = `urn:abeta:adr:${idNum}`;
      addNode({
        id: adrUrn,
        type: 'ADR',
        idNumber: idNum,
        title,
        path: rel,
        url: `${REPO_BLOB_BASE}/${rel}`,
      });
      addEdge(ecosystemUrn, adrUrn, 'governed_by_adr');
      adrList.push({ id: idNum, title, path: rel, url: `${REPO_BLOB_BASE}/${rel}` });

      pushChunk({
        id: `adr-${idNum}`,
        urn: adrUrn,
        package: '@abeta.dev/react-libs',
        subpath: null,
        runtime: 'documentation',
        category: 'adr',
        title,
        url: `${REPO_BLOB_BASE}/${rel}`,
        source: rel,
        symbols: [],
        content: raw.trim().slice(0, 3200),
      });
    }
  }

  // 4. Runnable Starter Examples
  const examples = [
    {
      id: 'nextjs-app-router',
      path: 'examples/nextjs-app-router',
      readme: 'examples/nextjs-app-router/README.md',
      title: 'Next.js App Router + Tailwind CSS v4 Starter',
      packages: ['@abeta.dev/ui', '@abeta.dev/india'],
    },
    {
      id: 'vite-react-19',
      path: 'examples/vite-react-19',
      readme: 'examples/vite-react-19/README.md',
      title: 'Vite + React 19 Zero-Tailwind Starter (@abeta.dev/ui/style.css)',
      packages: ['@abeta.dev/ui', '@abeta.dev/india', '@abeta.dev/talent'],
    },
  ];

  for (const ex of examples) {
    const exUrn = `urn:abeta:example:${ex.id}`;
    addNode({
      id: exUrn,
      type: 'StarterExample',
      title: ex.title,
      path: ex.path,
      url: `${REPO_BLOB_BASE}/${ex.path}`,
      packages: ex.packages,
    });
    addEdge(ecosystemUrn, exUrn, 'provides_example');
    for (const pkgName of ex.packages) {
      addEdge(exUrn, `urn:abeta:pkg:${pkgName}`, 'demonstrates_package');
    }
    if (existsSync(join(ROOT, ex.readme))) {
      pushChunk({
        id: `example-${ex.id}`,
        urn: exUrn,
        package: ex.packages[0],
        subpath: null,
        runtime: 'example',
        category: 'starter-template',
        title: ex.title,
        url: `${REPO_BLOB_BASE}/${ex.readme}`,
        source: ex.readme,
        symbols: [],
        content: readFileSync(join(ROOT, ex.readme), 'utf8').trim(),
      });
    }
  }

  // 5. Curated full reference chunks from public/llms-full.txt (verified TypeScript recipes + pitfalls)
  const llmsFullPath = join(ROOT, 'public', 'llms-full.txt');
  if (existsSync(llmsFullPath)) {
    const llmsFull = readFileSync(llmsFullPath, 'utf8');
    for (const sec of splitMarkdownSections(llmsFull, 160)) {
      const lower = sec.title.toLowerCase();
      let pkg = '@abeta.dev/react-libs';
      let urn = ecosystemUrn;
      let runtime = 'documentation';
      if (lower.includes('india')) {
        pkg = '@abeta.dev/india';
        urn = 'urn:abeta:pkg:@abeta.dev/india';
        runtime = 'rsc-universal';
      } else if (lower.includes('auth')) {
        pkg = '@abeta.dev/auth';
        urn = 'urn:abeta:pkg:@abeta.dev/auth';
        runtime = 'rsc-universal';
      } else if (lower.includes('talent')) {
        pkg = '@abeta.dev/talent';
        urn = 'urn:abeta:pkg:@abeta.dev/talent';
        runtime = 'client';
      } else if (lower.includes('ui') || lower.includes('css') || lower.includes('theme') || lower.includes('token')) {
        pkg = '@abeta.dev/ui';
        urn = 'urn:abeta:pkg:@abeta.dev/ui';
        runtime = 'client';
      }
      pushChunk({
        id: `llms-full-${slugify(sec.title)}`,
        urn,
        package: pkg,
        subpath: null,
        runtime,
        category: 'verified-recipe',
        title: `Verified Reference: ${sec.title}`,
        url: `${BASE_URL}/llms-full.txt`,
        source: 'public/llms-full.txt',
        symbols: [],
        content: sec.content.slice(0, 3200),
      });
    }
  }

  // 6. Product truth & Design tokens chunks
  for (const [docFile, cat, titlePrefix, targetUrn] of [
    ['PRODUCT.md', 'product-truth', 'Product Truth', ecosystemUrn],
    ['DESIGN.md', 'design-system', 'Design System Tokens', 'urn:abeta:pkg:@abeta.dev/ui'],
  ]) {
    const abs = join(ROOT, docFile);
    if (!existsSync(abs)) continue;
    const raw = readFileSync(abs, 'utf8');
    for (const sec of splitMarkdownSections(raw, 180)) {
      pushChunk({
        id: `${slugify(docFile)}-${slugify(sec.title)}`,
        urn: targetUrn,
        package: docFile === 'DESIGN.md' ? '@abeta.dev/ui' : '@abeta.dev/react-libs',
        subpath: docFile === 'DESIGN.md' ? './theme.css' : null,
        runtime: 'documentation',
        category: cat,
        title: `${titlePrefix}: ${sec.title}`,
        url: `${REPO_BLOB_BASE}/${docFile}`,
        source: docFile,
        symbols: [],
        content: sec.content.slice(0, 2800),
      });
    }
  }

  // Deduplicate chunk IDs deterministically
  const seenChunkIds = new Set();
  const dedupedChunks = [];
  for (const ch of ragChunks) {
    let id = ch.id;
    let n = 2;
    while (seenChunkIds.has(id)) {
      id = `${ch.id}-${n++}`;
    }
    seenChunkIds.add(id);
    dedupedChunks.push({ ...ch, id });
  }

  const contextGraph = {
    '@context': {
      abeta: 'https://abeta-dev.github.io/react-libs/vocab#',
      id: '@id',
      type: '@type',
      urn: 'abeta:urn',
      importPath: 'abeta:importPath',
      runtime: 'abeta:runtime',
      rscSafe: 'abeta:rscSafe',
      removeIn: 'abeta:removeIn',
    },
    schemaVersion: '1.0.0',
    version,
    baseUrl: BASE_URL,
    repository: 'https://github.com/Abeta-dev/react-libs',
    howToConnect: {
      ragChunksUrl: `${BASE_URL}/rag-chunks.jsonl`,
      llmsTxtUrl: `${BASE_URL}/llms.txt`,
      llmsFullTxtUrl: `${BASE_URL}/llms-full.txt`,
      registryUrl: `${BASE_URL}/registry.json`,
      joinKey: 'Join external app import specifiers (e.g. "@abeta.dev/ui/button", "@abeta.dev/india", "@abeta.dev/auth/core") directly to node.importPath or URN "urn:abeta:subpath:<importPath>" and "urn:abeta:symbol:<package>:<symbol>".',
    },
    stats: {
      packages: registryPackages.length,
      nodes: nodes.length,
      edges: edges.length,
      ragChunks: dedupedChunks.length,
      deprecations: (deprecations.entries || []).length,
      adrs: adrList.length,
    },
    nodes,
    edges,
  };

  const registry = {
    schemaVersion: '1.0.0',
    version,
    homepage: `${BASE_URL}/`,
    repository: 'https://github.com/Abeta-dev/react-libs',
    aiEndpoints: {
      llmsTxt: `${BASE_URL}/llms.txt`,
      llmsFullTxt: `${BASE_URL}/llms-full.txt`,
      contextGraph: `${BASE_URL}/context-graph.json`,
      ragChunks: `${BASE_URL}/rag-chunks.jsonl`,
      registry: `${BASE_URL}/registry.json`,
    },
    packages: registryPackages,
    deprecations: deprecations.entries || [],
    adrs: adrList,
    examples: examples.map(({ id, title, path, packages }) => ({
      id,
      title,
      path,
      url: `${REPO_BLOB_BASE}/${path}`,
      packages,
    })),
  };

  const files = [
    {
      rel: 'public/context-graph.json',
      content: JSON.stringify(contextGraph, null, 2) + '\n',
    },
    {
      rel: 'public/rag-chunks.jsonl',
      content: dedupedChunks.map((c) => JSON.stringify(c)).join('\n') + '\n',
    },
    {
      rel: 'public/registry.json',
      content: JSON.stringify(registry, null, 2) + '\n',
    },
  ];

  return { files, stats: contextGraph.stats };
}

function main() {
  const { files, stats } = buildArtifacts();

  if (CHECK_MODE) {
    let drifted = false;
    for (const f of files) {
      const abs = join(ROOT, f.rel);
      if (!existsSync(abs)) {
        console.error(`❌ [AI-ARTIFACTS] Missing generated file: ${f.rel}. Run "npm run generate:ai-artifacts".`);
        drifted = true;
        continue;
      }
      const existing = readFileSync(abs, 'utf8');
      if (existing !== f.content) {
        console.error(`❌ [AI-ARTIFACTS] ${f.rel} is out of date with repository state. Run "npm run generate:ai-artifacts".`);
        drifted = true;
      } else {
        console.log(`✅ [AI-ARTIFACTS] ${f.rel} is synchronized (sha256:${sha256(f.content)})`);
      }
    }
    if (drifted) process.exit(1);
    console.log(
      `✨ All AI / RAG / Context-Graph artifacts verified zero-drift (${stats.nodes} nodes, ${stats.edges} edges, ${stats.ragChunks} RAG chunks).`
    );
    process.exit(0);
  }

  for (const f of files) {
    writeFileSync(join(ROOT, f.rel), f.content, 'utf8');
    console.log(`📝 Generated ${f.rel} (${(Buffer.byteLength(f.content, 'utf8') / 1024).toFixed(1)} KB, sha256:${sha256(f.content)})`);
  }
  console.log(
    `\n✨ Generated AI / RAG / Context-Graph artifacts: ${stats.packages} packages, ${stats.nodes} graph nodes, ${stats.edges} edges, ${stats.ragChunks} pre-chunked RAG records.`
  );
}

main();
