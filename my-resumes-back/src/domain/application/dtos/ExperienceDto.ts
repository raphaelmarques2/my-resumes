import { ApiProperty } from '@nestjs/swagger';
import { Experience } from '@prisma/client';

export class ExperienceDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiProperty({ minLength: 1 })
  title!: string;

  @ApiProperty({ minLength: 1 })
  companyName!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ required: false })
  startDate?: string;

  @ApiProperty({ required: false })
  endDate?: string;

  @ApiProperty()
  technologies!: string[];

  static fromEntity(experience: Experience): ExperienceDto {
    return {
      id: experience.id,
      userId: experience.userId,
      title: experience.title,
      companyName: experience.company,
      description: experience.description,
      startDate: experience.startDate?.toISOString(),
      endDate: experience.endDate?.toISOString(),
      technologies: experience.technologies,
    };
  }
}
