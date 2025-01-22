import { z } from 'zod';
import { signUpSchema as backendScema } from '@idea/backend/src/types';

export const signUpSchema = backendScema
  .extend({
    passwordAgain: z.string().min(1, 'Password must be at least 1 character'),
  })
  .superRefine(({ password, passwordAgain }, ctx) => {
    if (password !== passwordAgain) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordAgain'],
      });
    }
  });

export type SignupState = z.infer<typeof signUpSchema>;
