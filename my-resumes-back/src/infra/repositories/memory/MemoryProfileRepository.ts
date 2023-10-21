import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from 'src/domain/application/repositories/ProfileRepository';
import { Profile } from 'src/domain/core/entities/Profile';
import { Id } from 'src/domain/core/value-objects/Id';
import { BaseMemoryRepository } from './BaseMemoryRepository';

@Injectable()
export class MemoryProfileRepository
  extends BaseMemoryRepository<Profile>
  implements ProfileRepository
{
  constructor() {
    super(Profile);
  }

  async getByUserId(userId: Id): Promise<Profile> {
    await this.delay();
    const profile = Array.from(this.entities.values()).find(
      (e) => e.userId.value === userId.value,
    );
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }
}
