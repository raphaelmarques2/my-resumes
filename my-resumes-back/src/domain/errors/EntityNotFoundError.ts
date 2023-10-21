import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundError extends NotFoundException {
  constructor(entity: { name: string }) {
    super(`${entity.name} not found`);
  }
}
