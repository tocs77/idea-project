import { z } from 'zod';

export const blockIdeaSchema = z.object({
  ideaId: z.string().min(1),
});
