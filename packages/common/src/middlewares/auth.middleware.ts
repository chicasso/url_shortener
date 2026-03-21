import jwt from 'jsonwebtoken';
import logger from '@url-shortener/logger';
import { Request, Response, NextFunction } from 'express';
import { getConfig } from '@url-shortener/config';

export default function authenticate(
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    next(new Error('Unauthorized: No token provided'));
    return;
  }
  try {
    const decoded = jwt.verify(token, getConfig().jwtSecret as string) as { userId: string }; 
    (req as unknown as { user: { userId: string } }).user = decoded;
    return next();
  } catch (err) {
    logger.error(`JWT verification failed: ${(err as Error).message}`);
    return next(new Error('Unauthorized: Invalid token'));
  }
}
