import 'express';
import { JwtPayload } from 'src/auth/auth.guard';

declare module 'express' {
  export interface Request {
    user?: JwtPayload;
  }
}
