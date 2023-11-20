import { Education } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const educationDtoSchema = z
  .object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    title: z.string().min(1),
    institution: z.string().min(1),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .strict();

export class EducationDto extends createZodDto(educationDtoSchema) {
  static createFrom(education: Education): EducationDto {
    return EducationDto.create({
      id: education.id,
      userId: education.userId,
      title: education.title,
      institution: education.institution,
      startDate: education.startDate?.toISOString(),
      endDate: education.endDate?.toISOString(),
    } satisfies EducationDto);
  }
}
