import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

const schema = z.string().trim().min(1);
export class Name {
  readonly value: string;
  constructor(value: string) {
    try {
      this.value = schema.parse(value);
    } catch (e) {
      throw new BadRequestException(`Invalid name (${value})`);
    }
  }
}
