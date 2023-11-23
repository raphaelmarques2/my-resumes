import { TransactionOptions } from 'src/modules/common/application/repositories/TransactionService';
import { Id } from '../../../common/domain/value-objects/Id';
import { Credential } from 'src/modules/auth/domain/entities/Credential.entity';

export abstract class CredentialRepository {
  abstract findByUserId(
    userId: Id,
    options?: TransactionOptions,
  ): Promise<Credential | null>;

  abstract add(
    credential: Credential,
    options?: TransactionOptions,
  ): Promise<void>;

  abstract update(
    credential: Credential,
    options?: TransactionOptions,
  ): Promise<void>;
}
