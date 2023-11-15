import { Resume } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const resumeDtoSchema = z
  .object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    title: z.string().min(1),
    description: z.string(),
    experiences: z.array(z.string()),
  })
  .strict();

export type ResumeAndExperiencesId = Resume & {
  experienceToResumes: { experienceId: string }[];
};

export class ResumeDto extends createZodDto(resumeDtoSchema) {
  static createFrom(resume: ResumeAndExperiencesId): ResumeDto {
    return ResumeDto.create({
      id: resume.id,
      userId: resume.userId,
      title: resume.title,
      description: resume.description,
      experiences: resume.experienceToResumes.map((item) => item.experienceId),
    } satisfies ResumeDto);
  }
}
