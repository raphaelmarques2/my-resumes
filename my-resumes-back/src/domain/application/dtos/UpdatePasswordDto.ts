import { z } from 'zod';

export const updatePasswordDtoSchema = z
  .object({
    userId: z.string().uuid(),
    password: z.string().min(3),
  })
  .strict();

export type UpdatePasswordDto = z.infer<typeof updatePasswordDtoSchema>;
