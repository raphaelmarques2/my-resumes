import { Experience } from '../../core/entities/Experience';
import { Id } from '../../core/value-objects/Id';
import { BaseRepository } from './BaseRepository';

export abstract class ExperienceRepository extends BaseRepository<Experience> {
  abstract delete(id: Id): Promise<void>;
  abstract listByUserId(userId: Id): Promise<Experience[]>;
}
