import jwt from 'jsonwebtoken';
import { env } from '../lib';

export const signJWT = (userId: string) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET);
};

export const verifyJWT = (token: string) => {
  try {
    jwt.verify(token, env.JWT_SECRET);
  } catch (_error) {
    return false;
  }
  return true;
};

export const decodeJWT = (token: string) => {
  return jwt.decode(token);
};
