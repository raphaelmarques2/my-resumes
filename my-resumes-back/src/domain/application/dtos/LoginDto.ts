import { z } from 'zod';

export const loginDtoSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
  })
  .strict();

export type LoginDto = z.infer<typeof loginDtoSchema>;
