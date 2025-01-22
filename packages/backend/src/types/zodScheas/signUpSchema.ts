import { z } from 'zod';

export const signUpSchema = z.object({
  nick: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .regex(/^[a-zA-Z0-9-]+$/, 'Nick can only contain letters, numbers and hyphens'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password must be at least 1 character'),
});
