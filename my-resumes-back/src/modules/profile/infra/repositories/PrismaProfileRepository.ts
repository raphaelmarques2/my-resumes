import { Injectable } from '@nestjs/common';
import { Profile as ProfileData } from '@prisma/client';
import { TransactionOptions } from 'src/modules/common/application/repositories/TransactionService';
import { Id } from 'src/modules/common/domain/value-objects/Id';
import { PrismaService } from 'src/modules/common/infra/PrismaService';
import { ProfileRepository } from '../../domain/application/repositories/ProfileRepository';
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

  async findByUserId(
    userId: Id,
    options?: TransactionOptions | undefined,
  ): Promise<Profile | null> {
    const data = await this.prisma.or(options?.transaction).profile.findFirst({
      where: { userId: userId.value },
    });
    if (!data) return null;
    return this.convertToEntity(data);
  }

  private convertToEntity(data: ProfileData): Profile {
    return Profile.load({
      id: new Id(data.id),
      userId: new Id(data.userId),
      name: data.name,
      email: data.email,
      address: data.address,
      linkedin: data.linkedin,
    });
  }
}