import { ApiProperty } from '@nestjs/swagger';
import { Resume } from '@prisma/client';
import { IsUUID } from 'class-validator';

export class ResumeDto {
  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiProperty({ minLength: 1 })
  title!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  experiences!: string[];

  static fromEntity(
    resume: Resume & { experienceToResumes: { id: string }[] },
  ): ResumeDto {
    return {
      id: resume.id,
      userId: resume.userId,
      title: resume.title,
      description: resume.description,
      experiences: resume.experienceToResumes.map((item) => item.id),
    };
  }
}
