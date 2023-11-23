import { Id } from 'src/modules/common/domain/value-objects/Id';
import { CredentialRepository } from '../../application/repositories/CredentialRepository';
import { Credential } from '../../domain/entities/Credential.entity';

export class MemoryCredentialRepository extends CredentialRepository {
  readonly items: Credential[];

  constructor() {
    super();
    this.items = [];
  }

  async findByUserId(userId: Id): Promise<Credential | null> {
    const user = this.items.find((e) => e.userId.isEqual(userId));
    return user || null;
  }
  async add(credential: Credential): Promise<void> {
    const index = this.items.findIndex((e) => e.id.isEqual(credential.id));
    if (index >= 0) throw new Error('Item already exist');

    this.items.push(credential);
  }
  async update(credential: Credential): Promise<void> {
    const index = this.items.findIndex((e) => e.id.isEqual(credential.id));
    if (index === -1) throw new Error('Item does not exist');

    this.items[index] = credential;
  }
}
