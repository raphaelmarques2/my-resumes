import { ApiProperty } from '@nestjs/swagger';

export class UpdateResumeDto {
  @ApiProperty({ required: false, minLength: 1 })
  title?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  experiences?: string[];
}
