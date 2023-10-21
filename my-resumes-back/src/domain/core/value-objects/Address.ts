import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

const schema = z.string().trim();
export class Address {
  readonly value: string;
  constructor(value: string) {
    try {
      this.value = schema.parse(value);
    } catch (error) {
      throw new BadRequestException(`Invalid address (${value})`);
    }
  }

  static parseOrUndefined(
    value: string | undefined | null,
  ): Address | undefined {
    if (!!value && Boolean(value)) return new Address(value);
    return undefined;
  }
}
