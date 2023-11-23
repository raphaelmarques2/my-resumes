import { TransactionOptions } from 'src/modules/common/application/repositories/TransactionService';
import { Profile } from '../../entities/Profile.entity';

export abstract class ProfileRepository {
  abstract add(profile: Profile, options?: TransactionOptions): Promise<void>;
}
