import { Resume } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const resumeDtoSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    description: z.string(),
    experiences: z.array(z.string()),
  })
  .strict();

export class ResumeDto extends createZodDto(resumeDtoSchema) {}

export function convertToResumeDto(
  resume: Resume & { experienceToResumes: { experienceId: string }[] },
): ResumeDto {
  return {
    id: resume.id,
    userId: resume.userId,
    title: resume.title,
    description: resume.description,
    experiences: resume.experienceToResumes.map((item) => item.experienceId),
  };
}
