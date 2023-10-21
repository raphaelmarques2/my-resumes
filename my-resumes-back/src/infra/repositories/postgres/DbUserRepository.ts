import { UserRepository } from 'src/domain/application/repositories/UserRepository';
import { User } from 'src/domain/core/entities/User';
import { Email } from 'src/domain/core/value-objects/Email';
import { Id } from 'src/domain/core/value-objects/Id';
import { PrismaService } from '../PrismaService';
import { User as UserModel } from '@prisma/client';
import { Name } from 'src/domain/core/value-objects/Name';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MyConfigService } from 'src/infra/services/MyConfigService';

@Injectable()
export class DbUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaService,
    private config: MyConfigService,
  ) {}

  async findByEmail(email: Email): Promise<User | null> {
    const item = await this.prisma.user.findFirst({
      where: { email: email.value },
    });
    if (!item) return null;
    return this.transformToEntity(item);
  }

  async save(entity: User): Promise<void> {
    if (this.config.logDb) console.log('saving user:', entity);
    await this.prisma.user.upsert({
      where: { id: entity.id.value },
      update: {
        name: entity.name.value,
      },
      create: {
        id: entity.id.value,
        name: entity.name.value,
        email: entity.email.value,
      },
    });
  }

  async load(id: Id): Promise<User> {
    const item = await this.prisma.user.findUnique({
      where: { id: id.value },
    });
    if (!item) throw new NotFoundException('User not found');
    return this.transformToEntity(item);
  }

  private transformToEntity(item: UserModel): User {
    return User.load({
      id: new Id(item.id),
      name: new Name(item.name),
      email: new Email(item.email),
    });
  }
}
