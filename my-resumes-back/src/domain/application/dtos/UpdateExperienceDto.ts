import { z } from 'zod';

export const updateExperienceDtoSchema = z
  .object({
    title: z.string().min(1).optional(),
    company: z.string().min(1).optional(),
    description: z.string().optional(),
    startDate: z.string().datetime().optional().or(z.string().length(0)),
    endDate: z.string().datetime().optional().or(z.string().length(0)),
    technologies: z.array(z.string().min(1)).optional(),
  })
  .strict();

export type UpdateExperienceDto = z.infer<typeof updateExperienceDtoSchema>;
