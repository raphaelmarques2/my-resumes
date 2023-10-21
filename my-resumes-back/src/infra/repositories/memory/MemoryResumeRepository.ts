import { Injectable } from '@nestjs/common';
import { ResumeRepository } from 'src/domain/application/repositories/ResumeRepository';
import { Resume } from 'src/domain/core/entities/Resume';
import { Id } from 'src/domain/core/value-objects/Id';
import { BaseMemoryRepository } from './BaseMemoryRepository';

@Injectable()
export class MemoryResumeRepository
  extends BaseMemoryRepository<Resume>
  implements ResumeRepository
{
  constructor() {
    super(Resume);
    console.log('new MemoryResumeRepository()');
  }

  async listByUserId(userId: Id): Promise<Resume[]> {
    await this.delay();
    return Array.from(this.entities.values()).filter(
      (c) => c.userId.value === userId.value,
    );
  }
}
