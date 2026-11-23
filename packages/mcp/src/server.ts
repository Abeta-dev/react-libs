import {
  checkRscBoundary,
  listPackages,
  lookupSymbol,
  searchRagChunks,
  traverseContextGraph,
} from './knowledge';
import type { AbetaKnowledgeBundle, JsonRpcRequest, JsonRpcResponse } from './types';

const PROTOCOL_VERSION = '2024-11-05';

type JsonRpcId = string | number | null;

export const MCP_TOOLS = [
  {
    name: 'abeta_list_packages',
    description:
      'List all @abeta.dev/* packages with current versions, roles, install commands, and exported subpaths.',
    inputSchema: {
      type: 'object',
      properties: {
        includeDeprecated: {
          type: 'boolean',
          description: 'Include deprecated legacy @abeta.dev/react-libs omnibus package (default: true).',
        },
      },
    },
  },
  {
    name: 'abeta_lookup_symbol',
    description:
      'Look up any component, hook, validator, or function across @abeta.dev/* and get its exact import path, runtime boundary, and URN.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Symbol name or substring (e.g. "Button", "calculateGSTSplit", "AuthClient", "AnalyticsEngine").',
        },
        limit: {
          type: 'number',
          description: 'Maximum results to return (default: 15, max: 50).',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'abeta_check_rsc_boundary',
    description:
      'Check whether an @abeta.dev/* import specifier is pure RSC/Node-safe, requires a React client boundary, isolates a browser worker, or is a CSS asset.',
    inputSchema: {
      type: 'object',
      properties: {
        importPath: {
          type: 'string',
          description: 'Exact package or subpath specifier (e.g. "@abeta.dev/india", "@abeta.dev/ui/pdf", "@abeta.dev/auth/core").',
        },
      },
      required: ['importPath'],
    },
  },
  {
    name: 'abeta_search_rag',
    description:
      'Search pre-chunked, URN-linked RAG records (verified TypeScript recipes, ADRs, skills, styling guides, deprecation policies).',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query (e.g. "Tailwind v4 theme.css", "UPI QR card", "HttpOnly refresh mutex", "deprecation sunset").',
        },
        packageName: {
          type: 'string',
          description: 'Optional exact package filter (e.g. "@abeta.dev/india").',
        },
        category: {
          type: 'string',
          description: 'Optional category filter (e.g. "package-contract", "verified-recipe", "adr", "agent-skill", "governance-policy").',
        },
        limit: {
          type: 'number',
          description: 'Maximum chunks to return (default: 5, max: 20).',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'abeta_traverse_context_graph',
    description:
      'Traverse typed nodes and edges in @abeta.dev context-graph.json starting from any URN or importPath (packages, subpaths, symbols, peers, deprecations, ADRs, examples).',
    inputSchema: {
      type: 'object',
      properties: {
        startKey: {
          type: 'string',
          description: 'Canonical URN (e.g. "urn:abeta:pkg:@abeta.dev/india") or importPath (e.g. "@abeta.dev/ui/pdf").',
        },
        depth: {
          type: 'number',
          description: 'Hop depth (1 or 2, default: 1).',
        },
        maxNodes: {
          type: 'number',
          description: 'Maximum nodes to return (default: 40, max: 100).',
        },
      },
      required: ['startKey'],
    },
  },
];

export const MCP_RESOURCES = [
  {
    uri: 'abeta://llms.txt',
    name: 'Abeta React Ecosystem llms.txt',
    description: 'Concise llmstxt.org index for @abeta.dev/* packages, boundaries, and signatures.',
    mimeType: 'text/markdown',
  },
  {
    uri: 'abeta://registry.json',
    name: 'Abeta Machine Package Registry',
    description: 'Structured JSON catalog of all packages, subpaths, symbols, deprecations, ADRs, and examples.',
    mimeType: 'application/json',
  },
  {
    uri: 'abeta://context-graph.json',
    name: 'Abeta JSON-LD Context Graph',
    description: 'GraphRAG-ready typed nodes and edges keyed by canonical URNs.',
    mimeType: 'application/ld+json',
  },
  {
    uri: 'abeta://rag-chunks.jsonl',
    name: 'Abeta Pre-Chunked RAG Corpus (JSONL)',
    description: 'Pre-chunked, SHA-256-stamped JSONL documents for direct vector DB ingestion.',
    mimeType: 'application/x-ndjson',
  },
];

function ok(id: JsonRpcId, result: unknown): JsonRpcResponse {
  return { jsonrpc: '2.0', id, result };
}

function err(id: JsonRpcId, code: number, message: string): JsonRpcResponse {
  return { jsonrpc: '2.0', id, error: { code, message } };
}

function textResult(data: unknown) {
  return {
    content: [
      {
        type: 'text',
        text: typeof data === 'string' ? data : JSON.stringify(data, null, 2),
      },
    ],
  };
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function asNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' ? value : fallback;
}

function dispatchToolCall(
  bundle: AbetaKnowledgeBundle,
  id: JsonRpcId,
  params: Record<string, unknown>
): JsonRpcResponse {
  const name = asString(params.name);
  const args = (params.arguments && typeof params.arguments === 'object'
    ? params.arguments
    : {}) as Record<string, unknown>;

  switch (name) {
    case 'abeta_list_packages':
      return ok(id, textResult(listPackages(bundle, args.includeDeprecated !== false)));
    case 'abeta_lookup_symbol':
      return ok(id, textResult(lookupSymbol(bundle, asString(args.query), asNumber(args.limit, 15))));
    case 'abeta_check_rsc_boundary':
      return ok(id, textResult(checkRscBoundary(bundle, asString(args.importPath))));
    case 'abeta_search_rag':
      return ok(
        id,
        textResult(
          searchRagChunks(bundle, asString(args.query), {
            packageName: asOptionalString(args.packageName),
            category: asOptionalString(args.category),
            limit: asNumber(args.limit, 5),
          })
        )
      );
    case 'abeta_traverse_context_graph':
      return ok(
        id,
        textResult(
          traverseContextGraph(bundle, asString(args.startKey), asNumber(args.depth, 1), asNumber(args.maxNodes, 40))
        )
      );
    default:
      return err(id, -32602, `Unknown tool: ${name}`);
  }
}

function dispatchResourceRead(
  bundle: AbetaKnowledgeBundle,
  id: JsonRpcId,
  uri: string
): JsonRpcResponse {
  switch (uri) {
    case 'abeta://llms.txt':
      return ok(id, { contents: [{ uri, mimeType: 'text/markdown', text: bundle.llmsTxt }] });
    case 'abeta://registry.json':
      return ok(id, {
        contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(bundle.registry, null, 2) }],
      });
    case 'abeta://context-graph.json':
      return ok(id, {
        contents: [{ uri, mimeType: 'application/ld+json', text: JSON.stringify(bundle.contextGraph, null, 2) }],
      });
    case 'abeta://rag-chunks.jsonl':
      return ok(id, {
        contents: [
          {
            uri,
            mimeType: 'application/x-ndjson',
            text: bundle.ragChunks.map((c) => JSON.stringify(c)).join('\n') + '\n',
          },
        ],
      });
    default:
      return err(id, -32602, `Unknown resource URI: ${uri}`);
  }
}

export function createAbetaMcpHandler(bundle: AbetaKnowledgeBundle) {
  return function handleJsonRpcMessage(request: JsonRpcRequest): JsonRpcResponse | null {
    const id = request.id ?? null;

    if (request.method === 'notifications/initialized' || request.method.startsWith('notifications/')) {
      return null;
    }

    switch (request.method) {
      case 'initialize':
        return ok(id, {
          protocolVersion: PROTOCOL_VERSION,
          capabilities: { tools: {}, resources: {} },
          serverInfo: { name: '@abeta.dev/mcp', version: bundle.registry.version },
        });
      case 'ping':
        return ok(id, {});
      case 'tools/list':
        return ok(id, { tools: MCP_TOOLS });
      case 'tools/call':
        return dispatchToolCall(bundle, id, request.params ?? {});
      case 'resources/list':
        return ok(id, { resources: MCP_RESOURCES });
      case 'resources/read':
        return dispatchResourceRead(bundle, id, asString(request.params?.uri));
      default:
        return err(id, -32601, `Method not found: ${request.method}`);
    }
  };
}
