import { z } from 'zod';

export const ideaSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  nick: z
    .string({ required_error: 'Nick is required' })
    .min(1, 'Nick is required')
    .regex(/^[a-zA-Z0-9-]+$/, 'Nick can only contain letters, numbers and hyphens'),
  description: z.string({ required_error: 'Description is required' }).min(1, 'Description is required'),
  text: z
    .string({ required_error: 'Text is required' })
    .min(100, 'Text must be at least 100 characters')
    .min(1, 'Text is required'),
});
