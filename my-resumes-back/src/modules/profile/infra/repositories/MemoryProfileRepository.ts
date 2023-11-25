import { Id } from 'src/modules/common/domain/value-objects/Id';
import { ProfileRepository } from '../../domain/application/repositories/ProfileRepository';
import { Profile } from '../../domain/entities/Profile.entity';

export class MemoryProfileRepository extends ProfileRepository {
  readonly items: Profile[];

  constructor() {
    super();
    this.items = [];
  }

  async add(profile: Profile): Promise<void> {
    const index = this.items.findIndex((e) => e.id.isEqual(profile.id));
    if (index >= 0) throw new Error('Item already exist');

    this.items.push(profile);
  }

  async findByUserId(userId: Id): Promise<Profile | null> {
    const profile = this.items.find((e) => e.userId.isEqual(userId));
    return profile || null;
  }

  async findById(id: Id): Promise<Profile | null> {
    const profile = this.items.find((e) => e.id.isEqual(id));
    return profile || null;
  }

  async update(profile: Profile): Promise<void> {
    const index = this.items.findIndex((e) => e.id.isEqual(profile.id));
    if (index === -1) throw new Error('Item does not exist');

    this.items[index] = profile;
  }
}
