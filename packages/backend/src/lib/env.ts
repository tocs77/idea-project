import { z } from 'zod';
import 'dotenv/config';

const zEnv = z.object({
  PORT: z.string().trim().min(1).default('5000'),
  JWT_SECRET: z.string().trim().min(1).default('secret'),
  DATABASE_URL: z.string().trim().min(1),
  PASSWORD_SALT: z.string().trim().min(1),
});

export const env = zEnv.parse(process.env);
