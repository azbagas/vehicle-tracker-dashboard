import { Request } from 'express';
import { UserJWTPayload } from '../../model/user.model';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserJWTPayload;
  }
}
