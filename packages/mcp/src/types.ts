export interface AbetaSubpathInfo {
  subpath: string;
  importPath: string;
  runtime: string;
  useClientRequired: boolean;
  rscSafe: boolean;
  symbolCount: number;
  symbols: string[];
}

export interface AbetaPackageInfo {
  name: string;
  version: string;
  deprecated: boolean;
  description: string;
  role: string;
  directory: string;
  npmUrl: string;
  githubPackagesName: string;
  docsUrl: string;
  skillPath?: string | undefined;
  peerDependencies: Array<{ name: string; range: string; optional: boolean }>;
  subpaths: AbetaSubpathInfo[];
}

export interface AbetaDeprecationEntry {
  id: string;
  scope: string;
  symbol: string;
  deprecatedSince: string;
  removeIn: string;
  status: string;
  replacement: string;
  migrationDoc: string;
}

export interface AbetaRegistry {
  schemaVersion: string;
  version: string;
  homepage: string;
  repository: string;
  aiEndpoints: Record<string, string>;
  packages: AbetaPackageInfo[];
  deprecations: AbetaDeprecationEntry[];
  adrs: Array<{ id: string; title: string; path: string; url: string }>;
  examples: Array<{ id: string; title: string; path: string; url: string; packages: string[] }>;
}

export interface ContextGraphNode {
  id: string;
  type: string;
  [key: string]: unknown;
}

export interface ContextGraphEdge {
  source: string;
  target: string;
  relation: string;
  [key: string]: unknown;
}

export interface AbetaContextGraph {
  schemaVersion: string;
  version: string;
  baseUrl: string;
  repository: string;
  howToConnect: Record<string, string>;
  stats: Record<string, number>;
  nodes: ContextGraphNode[];
  edges: ContextGraphEdge[];
}

export interface RagChunk {
  id: string;
  urn: string;
  version: string;
  package: string;
  subpath: string | null;
  runtime: string;
  category: string;
  title: string;
  url: string;
  source: string;
  symbols: string[];
  content: string;
  sha256: string;
}

export interface AbetaKnowledgeBundle {
  registry: AbetaRegistry;
  contextGraph: AbetaContextGraph;
  ragChunks: RagChunk[];
  llmsTxt: string;
}

export interface JsonRpcRequest {
  jsonrpc?: string | undefined;
  id?: string | number | null | undefined;
  method: string;
  params?: Record<string, unknown> | undefined;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}
