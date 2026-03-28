import jwt from 'jsonwebtoken';
import { IRequest } from '../types/api.ts';
import { defaultLogger as logger } from '../logger/logger.ts';
import { Response, NextFunction } from 'express';
import { getConfig } from '@url-shortener/config';

export function authenticate(
  req: IRequest<unknown, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    next(new Error('Unauthorized: No token provided'));
    return;
  }
  try {
    const decoded = jwt.verify(token, getConfig().jwtSecret); 
    req.user = decoded as { userId: string, email?: string };
    return next();
  } catch (err) {
    logger.error(`JWT verification failed: ${(err as Error).message}`);
    return next(new Error('Unauthorized: Invalid token'));
  }
}
