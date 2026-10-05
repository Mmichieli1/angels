export interface KeycloakUserPayload {
  userId: string;
  email: string;
  roles?: string[];
}
