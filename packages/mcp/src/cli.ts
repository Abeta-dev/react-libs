import { createInterface } from 'node:readline';
import { DEFAULT_REMOTE_BASE_URL, loadBundledKnowledge, loadRemoteKnowledge } from './knowledge';
import { createAbetaMcpHandler } from './server';
import type { JsonRpcRequest } from './types';

async function main() {
  const args = process.argv.slice(2);
  const useRemote = args.includes('--remote');
  const remoteUrlIdx = args.indexOf('--url');
  const remoteUrl =
    remoteUrlIdx !== -1 && args[remoteUrlIdx + 1]
      ? args[remoteUrlIdx + 1]
      : DEFAULT_REMOTE_BASE_URL;

  const bundle = useRemote
    ? await loadRemoteKnowledge(remoteUrl)
    : loadBundledKnowledge();

  const handle = createAbetaMcpHandler(bundle);

  const rl = createInterface({
    input: process.stdin,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    try {
      const req = JSON.parse(trimmed) as JsonRpcRequest;
      const res = handle(req);
      if (res) {
        process.stdout.write(JSON.stringify(res) + '\n');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid JSON-RPC payload';
      process.stdout.write(
        JSON.stringify({
          jsonrpc: '2.0',
          id: null,
          error: { code: -32700, message },
        }) + '\n'
      );
    }
  });
}

main().catch((error) => {
  process.stderr.write(`[@abeta.dev/mcp] Fatal startup error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
