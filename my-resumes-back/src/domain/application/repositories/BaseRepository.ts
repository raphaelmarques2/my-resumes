import { Id } from '../../core/value-objects/Id';

export abstract class BaseRepository<T> {
  abstract save(entity: T): Promise<void>;
  abstract load(id: Id): Promise<T>;
}
