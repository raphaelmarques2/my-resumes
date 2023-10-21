import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Resume } from 'src/domain/core/entities/Resume';

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

  static fromEntity(entity: Resume): ResumeDto {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      title: entity.title.value,
      description: entity.description,
      experiences: entity.experiences.map((e) => e.value),
    };
  }
}
