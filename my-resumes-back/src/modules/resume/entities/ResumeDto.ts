import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { Resume } from './Resume.entity';

export const resumeDtoSchema = z
  .object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    title: z.string().min(1),
    description: z.string(),
    experiences: z.array(z.string()),
  })
  .strict();

export class ResumeDto extends createZodDto(resumeDtoSchema) {
  static createFrom(resume: Resume): ResumeDto {
    return ResumeDto.create({
      id: resume.id.value,
      userId: resume.userId.value,
      title: resume.title.value,
      description: resume.description,
      experiences: resume.experiences.map((item) => item.value),
    } satisfies ResumeDto);
  }
}
