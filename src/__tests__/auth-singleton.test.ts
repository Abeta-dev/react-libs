import { describe, it, expect } from 'vitest';
import { AuthContext as RootAuthContext, AuthProvider as RootAuthProvider } from '../auth';
import { AuthContext as PkgAuthContext, AuthProvider as PkgAuthProvider } from '@abeta.dev/auth';

describe('ARC-05: Auth Context Singleton Identity', () => {
  it('guarantees identical React context reference across root re-export and package', () => {
    expect(RootAuthContext).toBe(PkgAuthContext);
  });

  it('guarantees identical AuthProvider component reference across root re-export and package', () => {
    expect(RootAuthProvider).toBe(PkgAuthProvider);
  });
});
