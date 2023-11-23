import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../../domain/application/repositories/ProfileRepository';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { TransactionOptions } from 'src/modules/common/application/repositories/TransactionService';
import { Profile } from '../../domain/entities/Profile.entity';

@Injectable()
export class PrismaProfileRepository extends ProfileRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async add(profile: Profile, options?: TransactionOptions): Promise<void> {
    await this.prisma.or(options?.transaction).profile.create({
      data: {
        id: profile.id.value,
        userId: profile.id.value,
        name: profile.name,
        email: profile.email,
        address: profile.address,
        linkedin: profile.linkedin,
      },
    });
  }
}
