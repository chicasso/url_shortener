export interface Response<T> {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  error?: { message: string; code?: string; };
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email?: string;
      };
    }
  }
}

export { Request as IRequest } from 'express';
