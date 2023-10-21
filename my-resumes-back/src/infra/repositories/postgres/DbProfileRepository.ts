import { ProfileRepository } from 'src/domain/application/repositories/ProfileRepository';
import { Profile } from 'src/domain/core/entities/Profile';
import { Id } from 'src/domain/core/value-objects/Id';
import { PrismaService } from '../PrismaService';
import { Profile as ProfileModel } from '@prisma/client';
import { Name } from 'src/domain/core/value-objects/Name';
import { Email } from 'src/domain/core/value-objects/Email';
import { Address } from 'src/domain/core/value-objects/Address';
import { Url } from 'src/domain/core/value-objects/Url';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MyConfigService } from 'src/infra/services/MyConfigService';

@Injectable()
export class DbProfileRepository implements ProfileRepository {
  constructor(
    private prisma: PrismaService,
    private config: MyConfigService,
  ) {}

  async getByUserId(userId: Id): Promise<Profile> {
    const item = await this.prisma.profile.findFirst({
      where: { userId: userId.value },
      orderBy: [{ createdAt: 'desc' }], //last one
    });
    if (!item) throw new NotFoundException('Profile not found');
    return this.transformToEntity(item);
  }

  async save(entity: Profile): Promise<void> {
    if (this.config.logDb) console.log('saving profile:', entity);
    await this.prisma.profile.upsert({
      where: { id: entity.id.value },
      update: {
        name: entity.name.value,
        email: entity.email.value,
        address: entity.address?.value ?? null,
        linkedin: entity.linkedin?.value ?? null,
      },
      create: {
        id: entity.id.value,
        name: entity.name.value,
        email: entity.email.value,
        address: entity.address?.value,
        linkedin: entity.linkedin?.value,
        userId: entity.userId.value,
      },
    });
  }

  async load(id: Id): Promise<Profile> {
    const item = await this.prisma.profile.findUnique({
      where: { id: id.value },
    });
    if (!item) throw new NotFoundException('Profile not found');
    return this.transformToEntity(item);
  }

  private transformToEntity(item: ProfileModel): Profile {
    return Profile.load({
      id: new Id(item.id),
      userId: new Id(item.userId),
      name: new Name(item.name),
      email: new Email(item.email),
      address: item.address ? new Address(item.address) : null,
      linkedin: item.linkedin ? new Url(item.linkedin) : null,
    });
  }
}
