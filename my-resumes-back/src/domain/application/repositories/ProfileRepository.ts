import { Profile } from 'src/domain/core/entities/Profile';
import { BaseRepository } from './BaseRepository';
import { Id } from 'src/domain/core/value-objects/Id';

export abstract class ProfileRepository extends BaseRepository<Profile> {
  abstract getByUserId(userId: Id): Promise<Profile>;
}
