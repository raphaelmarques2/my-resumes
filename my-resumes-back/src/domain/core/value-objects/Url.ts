import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

const schema = z.string().trim().url();
export class Url {
  readonly value: string;
  constructor(value: string) {
    try {
      this.value = schema.parse(value);
    } catch (e) {
      throw new BadRequestException(`Invalid Url (${value})`);
    }
  }

  static parseOrUndefined(value: string | undefined | null): Url | undefined {
    if (!!value && Boolean(value)) return new Url(value);
    return undefined;
  }
}
