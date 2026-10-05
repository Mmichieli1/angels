import { KeycloakUserPayload } from '../auth/jwt-payload.type.ts';

export declare global {
  namespace Express {
    interface Request {
      user?: KeycloakUserPayload;
    }
  }
}
