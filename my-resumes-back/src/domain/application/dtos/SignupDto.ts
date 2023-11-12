import { z } from 'zod';

export const signupDtoSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(3),
  })
  .strict();

export type SignupDto = z.infer<typeof signupDtoSchema>;
