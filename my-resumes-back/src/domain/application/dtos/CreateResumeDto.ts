import { ApiProperty } from '@nestjs/swagger';

export class CreateResumeDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({ required: false })
  description?: string;
}
