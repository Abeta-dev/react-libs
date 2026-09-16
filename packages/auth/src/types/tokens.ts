import type { AuthSession } from './adapter';

export interface TokenStorage {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

export interface TokenManagerOptions {
  /**
   * How many milliseconds before token expiry to initiate silent refresh.
   * Default: 60,000 (1 minute).
   */
  refreshThresholdMs?: number;

  /**
   * Optional custom storage mechanism for tokens when not relying on
   * in-memory state or HttpOnly cookies.
   */
  storage?: TokenStorage;

  /**
   * Storage key for access token when storage is provided.
   * Default: 'abeta_access_token'
   */
  tokenStorageKey?: string;

  /**
   * Storage key for refresh token when storage is provided.
   * Default: 'abeta_refresh_token'
   */
  refreshTokenStorageKey?: string;

  /**
   * Callback invoked when the session is successfully refreshed.
   */
  onSessionRefreshed?: (session: AuthSession) => void;

  /**
   * Callback invoked when token refresh fails and session becomes invalid.
   */
  onSessionExpired?: (error: unknown) => void;
}
