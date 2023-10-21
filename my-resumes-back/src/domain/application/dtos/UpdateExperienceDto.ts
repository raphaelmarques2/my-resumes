import { ApiProperty } from '@nestjs/swagger';

export class UpdateExperienceDto {
  @ApiProperty({ required: false, minLength: 1 })
  title?: string;

  @ApiProperty({ required: false, minLength: 1 })
  companyName?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  startDate?: string;

  @ApiProperty({ required: false })
  endDate?: string;

  @ApiProperty({ required: false })
  technologies?: string[];
}
