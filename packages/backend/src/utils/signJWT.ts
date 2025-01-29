import jwt from 'jsonwebtoken';

export const signJWT = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string);
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const decodeJWT = (token: string) => {
  return jwt.decode(token);
};
