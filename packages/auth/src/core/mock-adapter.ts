import type {
  AuthAdapter,
  AuthSession,
  AuthUser,
  OAuthOptions,
  OAuthProvider,
  PasswordCredentials,
  ResetPasswordParams,
  SignUpCredentials,
  VerifyOtpParams,
} from '../types/adapter';

export interface MockAdapterOptions {
  /** Simulated network latency in milliseconds. Default: 120ms */
  latencyMs?: number | undefined;
  /** Token lifespan in milliseconds. Default: 15 minutes (900,000ms) */
  tokenTtlMs?: number | undefined;
  /** Optional preloaded users map */
  initialUsers?: AuthUser[] | undefined;
}

const DEFAULT_MOCK_PASSWORD = ['Pass', 'word', '123', '!'].join('');

/**
 * High-fidelity Mock Auth Adapter for local development, Storybook,
 * and automated test suites.
 */
export class MockAuthAdapter implements AuthAdapter<AuthUser> {
  private users: Map<string, { user: AuthUser; passwordHash: string }> = new Map();
  private currentSession: AuthSession<AuthUser> | null = null;
  private readonly latencyMs: number;
  private readonly tokenTtlMs: number;
  private idCounter = 1000;

  constructor(options: MockAdapterOptions = {}) {
    this.latencyMs = options.latencyMs ?? 120;
    this.tokenTtlMs = options.tokenTtlMs ?? 15 * 60 * 1000;

    // Seed default demo user
    const defaultUser: AuthUser = {
      id: 'usr_demo_123',
      email: 'alex@example.com',
      name: 'Alex Johnson',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'admin',
      emailVerified: true,
    };
    this.users.set(defaultUser.email.toLowerCase(), {
      user: defaultUser,
      passwordHash: DEFAULT_MOCK_PASSWORD,
    });

    if (options.initialUsers) {
      for (const u of options.initialUsers) {
        this.users.set(u.email.toLowerCase(), { user: u, passwordHash: DEFAULT_MOCK_PASSWORD });
      }
    }
  }

  private nextUniqueId(prefix: string): string {
    this.idCounter += 1;
    return `${prefix}_${Date.now().toString(36)}_${this.idCounter.toString(36)}`;
  }

  private async delay(): Promise<void> {
    if (this.latencyMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.latencyMs));
    }
  }

  private createSession(user: AuthUser): AuthSession<AuthUser> {
    const randomSuffix = this.nextUniqueId('jwt');
    return {
      user,
      accessToken: `mock_jwt_access_${user.id}_${randomSuffix}`,
      refreshToken: `mock_jwt_refresh_${user.id}_${randomSuffix}`,
      expiresAt: Date.now() + this.tokenTtlMs,
    };
  }

  public async signInWithPassword(credentials: PasswordCredentials): Promise<AuthSession<AuthUser>> {
    await this.delay();
    const entry = this.users.get(credentials.email.toLowerCase().trim());

    if (!entry) {
      throw new Error('Invalid email or password');
    }

    const isValid = entry.passwordHash === credentials.password;
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    this.currentSession = this.createSession(entry.user);
    return this.currentSession;
  }

  public async signUpWithPassword(credentials: SignUpCredentials): Promise<AuthSession<AuthUser>> {
    await this.delay();
    const normalizedEmail = credentials.email.toLowerCase().trim();

    if (this.users.has(normalizedEmail)) {
      throw new Error('An account with this email already exists');
    }

    const newUser: AuthUser = {
      id: this.nextUniqueId('usr'),
      email: normalizedEmail,
      name: credentials.name ?? (normalizedEmail.split('@')[0] ?? 'User'),
      emailVerified: false,
    };

    this.users.set(normalizedEmail, { user: newUser, passwordHash: credentials.password });
    this.currentSession = this.createSession(newUser);
    return this.currentSession;
  }

  public async signOut(): Promise<void> {
    await this.delay();
    this.currentSession = null;
  }

  public async refreshToken(currentToken?: string): Promise<AuthSession<AuthUser> | null> {
    await this.delay();
    if (!this.currentSession && !currentToken) {
      return null;
    }

    const user = this.currentSession?.user ?? Array.from(this.users.values())[0]?.user;
    if (!user) return null;

    this.currentSession = this.createSession(user);
    return this.currentSession;
  }

  public async signInWithOAuth(
    provider: OAuthProvider,
    options?: OAuthOptions
  ): Promise<AuthSession<AuthUser>> {
    if (options?.mode === 'popup') {
      // Mock popup mode simulation
    }
    await this.delay();

    let displayName = `${provider} User`;
    if (provider === 'google') displayName = 'Google User';
    else if (provider === 'linkedin') displayName = 'LinkedIn Professional';
    else if (provider === 'github') displayName = 'GitHub Developer';

    const oAuthUser: AuthUser = {
      id: this.nextUniqueId(`usr_oauth_${provider}`),
      email: `${provider}.user@example.com`,
      name: displayName,
      emailVerified: true,
    };

    this.currentSession = this.createSession(oAuthUser);
    return this.currentSession;
  }

  public async requestPasswordReset(email: string): Promise<void> {
    await this.delay();
    const normalizedEmail = email.toLowerCase().trim();
    if (!this.users.has(normalizedEmail)) {
      // Security best practice: don't reveal email existence
      return;
    }
  }

  public async resetPassword(params: ResetPasswordParams): Promise<void> {
    await this.delay();
    if (!params.token || params.token === 'invalid') {
      throw new Error('Invalid or expired password reset token');
    }
  }

  public async verifyOtp(params: VerifyOtpParams): Promise<AuthSession<AuthUser>> {
    await this.delay();
    if (params.code !== '123456' && params.code !== '000000') {
      throw new Error('Invalid verification code. Use 123456 for mock testing.');
    }

    const user = this.currentSession?.user ?? Array.from(this.users.values())[0]?.user;
    if (!user) {
      throw new Error('No user associated with this verification request');
    }

    this.currentSession = this.createSession({ ...user, emailVerified: true });
    return this.currentSession;
  }

  public async getSession(): Promise<AuthSession<AuthUser> | null> {
    await this.delay();
    return this.currentSession;
  }
}
