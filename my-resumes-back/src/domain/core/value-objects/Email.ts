import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

const schema = z.string().email();
export class Email {
  readonly value: string;
  constructor(value: string) {
    try {
      this.value = schema.parse(value);
    } catch (error) {
      throw new BadRequestException(`Invalid email (${value})`);
    }
  }
}
