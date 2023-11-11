import { BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export function validateDto(schema: ZodSchema, dto: any) {
  try {
    schema.parse(dto);
  } catch (error) {
    throw new BadRequestException();
  }
}
