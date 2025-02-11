import { z } from 'zod';

export const updateProfileSchema = z.object({
  nick: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .regex(/^[a-zA-Z0-9-]+$/, 'Nick can only contain letters, numbers and hyphens'),
  name: z.string().max(50, 'Name must be at most 50 characters').default(''),
});
