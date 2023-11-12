import { z } from 'zod';

export const createResumeDtoSchema = z
  .object({
    userId: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().optional(),
    experiences: z.array(z.string().uuid()).optional(),
  })
  .strict();

export type CreateResumeDto = z.infer<typeof createResumeDtoSchema>;
