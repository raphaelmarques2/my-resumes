import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/application/repositories/UserRepository';
import { User } from 'src/domain/core/entities/User';
import { Email } from 'src/domain/core/value-objects/Email';
import { BaseMemoryRepository } from './BaseMemoryRepository';

@Injectable()
export class MemoryUserRepository
  extends BaseMemoryRepository<User>
  implements UserRepository
{
  constructor() {
    super(User);
  }

  async findByEmail(email: Email): Promise<User | null> {
    await this.delay();
    const user = Array.from(this.entities.values()).find(
      (e) => e.email.value === email.value,
    );
    return user ?? null;
  }
}
