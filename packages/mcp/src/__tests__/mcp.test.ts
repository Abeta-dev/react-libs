import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import {
  checkRscBoundary,
  createAbetaMcpHandler,
  listPackages,
  loadBundledKnowledge,
  lookupSymbol,
  searchRagChunks,
  traverseContextGraph,
} from '../index';

const PUBLIC_DIR = resolve(__dirname, '../../../../public');

describe('@abeta.dev/mcp knowledge & JSON-RPC server', () => {
  const bundle = loadBundledKnowledge(PUBLIC_DIR);
  const handle = createAbetaMcpHandler(bundle);

  it('loads bundled registry, context graph, rag chunks, and llms.txt cleanly', () => {
    expect(bundle.registry.packages.length).toBeGreaterThanOrEqual(5);
    expect(bundle.contextGraph.nodes.length).toBeGreaterThan(100);
    expect(bundle.ragChunks.length).toBeGreaterThan(20);
    expect(bundle.llmsTxt).toContain('@abeta.dev/ui');
  });

  it('responds to MCP initialize, ping, tools/list, and resources/list', () => {
    const init = handle({ jsonrpc: '2.0', id: 1, method: 'initialize' });
    expect(init?.result).toMatchObject({
      protocolVersion: '2024-11-05',
      serverInfo: { name: '@abeta.dev/mcp' },
    });

    expect(handle({ jsonrpc: '2.0', method: 'notifications/initialized' })).toBeNull();
    expect(handle({ jsonrpc: '2.0', id: 2, method: 'ping' })?.result).toEqual({});

    const tools = handle({ jsonrpc: '2.0', id: 3, method: 'tools/list' });
    expect((tools?.result as { tools: unknown[] }).tools).toHaveLength(5);

    const resources = handle({ jsonrpc: '2.0', id: 4, method: 'resources/list' });
    expect((resources?.result as { resources: unknown[] }).resources).toHaveLength(4);
  });

  it('resolves symbols, RSC boundaries, RAG queries, and context graph traversals', () => {
    const pkgs = listPackages(bundle, false);
    expect(pkgs.some((p) => p.name === '@abeta.dev/ui')).toBe(true);
    expect(pkgs.some((p) => p.name === '@abeta.dev/react-libs')).toBe(false);

    const gst = lookupSymbol(bundle, 'calculateGSTSplit');
    expect(gst[0]).toMatchObject({
      symbol: 'calculateGSTSplit',
      package: '@abeta.dev/india',
      rscSafe: true,
    });

    const pdfCheck = checkRscBoundary(bundle, '@abeta.dev/ui/pdf');
    expect(pdfCheck).toMatchObject({
      found: true,
      runtime: 'browser-worker-client',
      rscSafe: false,
      useClientRequired: true,
    });

    const indiaCheck = checkRscBoundary(bundle, '@abeta.dev/india');
    expect(indiaCheck).toMatchObject({
      found: true,
      runtime: 'rsc-universal',
      rscSafe: true,
    });

    const ragHits = searchRagChunks(bundle, 'Tailwind v4 theme.css', { limit: 3 });
    expect(ragHits.length).toBeGreaterThan(0);

    const traversal = traverseContextGraph(bundle, 'urn:abeta:pkg:@abeta.dev/india', 1, 20);
    expect(traversal.found).toBe(true);
    expect(traversal.edgeCount).toBeGreaterThan(0);
  });

  it('executes tools/call and resources/read via JSON-RPC', () => {
    const callRes = handle({
      jsonrpc: '2.0',
      id: 10,
      method: 'tools/call',
      params: { name: 'abeta_check_rsc_boundary', arguments: { importPath: '@abeta.dev/auth/core' } },
    });
    const payload = JSON.parse(
      ((callRes?.result as { content: Array<{ text: string }> }).content[0]).text
    );
    expect(payload).toMatchObject({ found: true, rscSafe: true, runtime: 'rsc-universal' });

    const resRead = handle({
      jsonrpc: '2.0',
      id: 11,
      method: 'resources/read',
      params: { uri: 'abeta://llms.txt' },
    });
    expect((resRead?.result as { contents: Array<{ text: string }> }).contents[0].text).toContain('@abeta.dev/ui');

    const unknown = handle({ jsonrpc: '2.0', id: 12, method: 'unknown/method' });
    expect(unknown?.error?.code).toBe(-32601);
  });
});
