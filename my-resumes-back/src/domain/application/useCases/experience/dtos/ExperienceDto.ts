import { Experience } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const experienceDtoSchema = z
  .object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    title: z.string().min(1),
    company: z.string().min(1),
    description: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    technologies: z.array(z.string().min(1)),
  })
  .strict();

export class ExperienceDto extends createZodDto(experienceDtoSchema) {
  static createFrom(experience: Experience): ExperienceDto {
    return ExperienceDto.create({
      id: experience.id,
      userId: experience.userId,
      title: experience.title,
      company: experience.company,
      description: experience.description,
      startDate: experience.startDate?.toISOString(),
      endDate: experience.endDate?.toISOString(),
      technologies: experience.technologies,
    } satisfies ExperienceDto);
  }
}
