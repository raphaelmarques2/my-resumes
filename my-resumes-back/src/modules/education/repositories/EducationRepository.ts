import { Injectable } from '@nestjs/common';
import { TransactionOptions } from 'src/modules/common/application/repositories/TransactionService';
import { Id } from 'src/modules/common/domain/value-objects/Id';
import { Education } from '../entities/Education.entity';

@Injectable()
export abstract class EducationRepository {
  abstract findById(
    id: Id,
    options?: TransactionOptions,
  ): Promise<Education | null>;
  abstract add(
    education: Education,
    options?: TransactionOptions,
  ): Promise<void>;
  abstract update(
    education: Education,
    options?: TransactionOptions,
  ): Promise<void>;
  abstract listByUserId(
    userId: Id,
    options?: TransactionOptions,
  ): Promise<Education[]>;
  abstract delete(id: Id): Promise<void>;
}
