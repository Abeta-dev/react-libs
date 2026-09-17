export { AuthClient } from './auth-client';
export { createAuthenticatedFetch, type AuthenticatedFetchClient, type AuthenticatedFetchOptions } from './authenticated-fetch';
export type {
  AccessSessionPersistence,
  ActivationInspection,
  AuthCapabilities,
  AuthClientAdapter,
  AuthClientOptions,
  AuthClientSession,
  AuthClientSnapshot,
  AuthClientStatus,
  AuthCoordinationMessage,
  CapabilityDescriptor,
  CsrfProvider,
  InvitationAccepted,
  InvitationInspection,
  PendingActivation,
  RefreshCoordinator,
} from '../types/client';
export { AuthClientError } from '../types/client';
