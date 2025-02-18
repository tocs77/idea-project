import { z } from 'zod';

export const setLikeSchema = z.object({
  ideaId: z.string().min(1),
  isLikedByMe: z.boolean(),
});
