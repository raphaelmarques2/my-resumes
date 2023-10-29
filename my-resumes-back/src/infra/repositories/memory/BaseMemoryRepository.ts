import { BaseRepository } from 'src/domain/application/repositories/BaseRepository';
import { Id } from 'src/domain/core/value-objects/Id';
import { EntityNotFoundError } from 'src/domain/errors/EntityNotFoundError';
import { wait } from 'src/utils/time';

export abstract class BaseMemoryRepository<
  T extends { id: Id },
> extends BaseRepository<T> {
  entities: Map<string, T>;

  private simulateDelay: boolean;

  constructor(private entityClass: { name: string }) {
    super();
    this.entities = new Map<string, T>();
    this.simulateDelay = Boolean(process.env.SIMULATE_DB_DELAY);
  }

  async delay() {
    if (this.simulateDelay) {
      await wait(100 + Math.random() * 200);
    }
  }

  async load(id: Id): Promise<T> {
    await this.delay();
    const item = this.entities.get(id.value);
    if (!item) throw new EntityNotFoundError(this.entityClass);
    return item;
  }

  async save(entity: T): Promise<void> {
    await this.delay();
    this.entities.set(entity.id.value, entity);
  }

  async delete(id: Id): Promise<void> {
    if (this.entities.has(id.value)) {
      this.entities.delete(id.value);
    }
  }

  async count(): Promise<number> {
    return this.entities.size;
  }
}
