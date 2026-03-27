import { getConfig } from '@url-shortener/config';
import jwt from 'jsonwebtoken';

export function sign(payload: string | Buffer | object): string {
  const { jwtSecret, expiresIn, algorithm } = getConfig();

  return jwt.sign(payload, jwtSecret, {
    expiresIn, algorithm: algorithm as jwt.Algorithm,
  });
}

export function verify(token: string): object | string {
  const { jwtSecret, algorithm } = getConfig();

  return jwt.verify(token, jwtSecret, {
    algorithms: [algorithm as jwt.Algorithm],
  });
}
