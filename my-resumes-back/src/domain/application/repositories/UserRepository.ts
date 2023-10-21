import { User } from 'src/domain/core/entities/User';
import { Email } from 'src/domain/core/value-objects/Email';
import { BaseRepository } from './BaseRepository';

export abstract class UserRepository extends BaseRepository<User> {
  abstract findByEmail(email: Email): Promise<User | null>;
}
