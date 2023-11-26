import { Injectable } from '@nestjs/common';
import { Id } from 'src/modules/common/domain/value-objects/Id';
import { EntityList } from 'src/modules/common/infra/repositories/EntityList';
import { Resume } from '../../entities/Resume.entity';
import { ResumeRepository } from '../../repositories/ResumeRepository';

@Injectable()
export class MemoryResumeRepository extends ResumeRepository {
  public items: EntityList<Resume>;

  constructor() {
    super();
    this.items = new EntityList<Resume>();
  }

  async add(resume: Resume): Promise<void> {
    this.items.add(resume);
  }
  async update(resume: Resume): Promise<void> {
    this.items.update(resume);
  }
  async delete(id: Id): Promise<void> {
    this.items.delete(id);
  }
  async findById(id: Id): Promise<Resume | null> {
    return this.items.findById(id);
  }
  async listUserResumes(userId: Id): Promise<Resume[]> {
    return this.items.filterBy((e) => e.userId.isEqual(userId));
  }
}
