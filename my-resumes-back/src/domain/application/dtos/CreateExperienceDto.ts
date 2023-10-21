import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsUUID()
  @ApiProperty({ format: 'UUID' })
  userId!: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  title!: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  companyName!: string;

  @ApiProperty({ required: false })
  technologies?: string[];
}
