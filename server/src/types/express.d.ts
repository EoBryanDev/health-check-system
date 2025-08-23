/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      user_id: string;
      role: TRole; // importe o TRole se necessário
    };
  }
}
