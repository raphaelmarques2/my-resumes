import { Email } from 'src/modules/common/domain/value-objects/Email';
import { Id } from 'src/modules/common/domain/value-objects/Id';
import { UserRepository } from '../../application/repositories/UserRepository';
import { User } from '../../domain/entities/User.entity';

export class MemoryUserRepository extends UserRepository {
  readonly items: User[];

  constructor() {
    super();
    this.items = [];
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = this.items.find((e) => e.email.isEqual(email));
    return user || null;
  }

  async findById(id: Id): Promise<User | null> {
    const user = this.items.find((e) => e.id.isEqual(id));
    return user || null;
  }

  async add(user: User): Promise<void> {
    const index = this.items.findIndex((e) => e.id.isEqual(user.id));
    if (index >= 0) throw new Error('Item already exist');

    this.items.push(user);
  }
}
