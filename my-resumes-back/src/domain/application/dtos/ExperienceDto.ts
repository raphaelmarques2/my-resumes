import { ApiProperty } from '@nestjs/swagger';
import { Experience } from 'src/domain/core/entities/Experience';

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

  static fromEntity(entity: Experience): ExperienceDto {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      title: entity.title,
      companyName: entity.companyName,
      description: entity.description,
      startDate: entity.startDate?.toISOString(),
      endDate: entity.endDate?.toISOString(),
      technologies: entity.technologies.map((e) => e.value),
    };
  }
}
