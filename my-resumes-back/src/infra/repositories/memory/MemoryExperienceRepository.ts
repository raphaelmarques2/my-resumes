import { Injectable } from '@nestjs/common';
import { ExperienceRepository } from 'src/domain/application/repositories/ExperienceRepository';
import { Experience } from 'src/domain/core/entities/Experience';
import { Id } from 'src/domain/core/value-objects/Id';
import { BaseMemoryRepository } from './BaseMemoryRepository';

@Injectable()
export class MemoryExperienceRepository
  extends BaseMemoryRepository<Experience>
  implements ExperienceRepository
{
  constructor() {
    super(Experience);
  }

  async listByUserId(userId: Id): Promise<Experience[]> {
    await this.delay();
    return Array.from(this.entities.values()).filter(
      (e) => e.userId.value === userId.value,
    );
  }
}
