import { z } from 'zod';

export const updateResumeDtoSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    experiences: z.array(z.string().uuid()).optional(),
  })
  .strict();

export type UpdateResumeDto = z.infer<typeof updateResumeDtoSchema>;
