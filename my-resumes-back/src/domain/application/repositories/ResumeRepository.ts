import { Resume } from '../../core/entities/Resume';
import { Id } from '../../core/value-objects/Id';
import { BaseRepository } from './BaseRepository';

export abstract class ResumeRepository extends BaseRepository<Resume> {
  abstract listByUserId(userId: Id): Promise<Resume[]>;
  abstract delete(id: Id): Promise<void>;
}
