import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { z } from 'zod';

const schema = z.string().min(1);
export class Id {
  readonly value: string;
  constructor(value?: string) {
    try {
      this.value = value ? schema.parse(value) : randomUUID();
    } catch (e) {
      throw new BadRequestException(`Invalid id (${value})`);
    }
  }
}
