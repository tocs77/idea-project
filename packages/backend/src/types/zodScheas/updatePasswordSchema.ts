import { z } from 'zod';

export const updatePasswordSchema = z.object({
  newPassword: z.string({ required_error: 'Password is required' }).min(1, 'Password must be at least 1 character'),
  oldPassword: z.string({ required_error: 'Password is required' }).min(1, 'Password must be at least 1 character'),
});
