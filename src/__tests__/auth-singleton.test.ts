import { describe, expect, it } from 'vitest';
import { AuthClient, AuthContext as RootAuthContext, AuthProvider as RootAuthProvider } from '../auth';

describe('ARC-05: GitHub auth distribution', () => {
  it('exposes one bundled auth implementation through the root auth subpath', () => {
    expect(typeof AuthClient).toBe('function');
    expect(RootAuthContext).toBeDefined();
    expect(RootAuthProvider).toBeDefined();
  });
});
