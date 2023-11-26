import { Email } from 'src/modules/common/domain/value-objects/Email';
import { Id } from 'src/modules/common/domain/value-objects/Id';
import { UserRepository } from '../../application/repositories/UserRepository';
import { User } from '../../domain/entities/User.entity';
import { PrismaService } from 'src/modules/common/infra/PrismaService';
import { Name } from 'src/modules/common/domain/value-objects/Name';
import { Injectable } from '@nestjs/common';
import { User as UserData } from '@prisma/client';
import { TransactionOptions } from 'src/modules/common/application/repositories/TransactionService';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findByEmail(
    email: Email,
    options?: TransactionOptions,
  ): Promise<User | null> {
    const user = await this.prisma.or(options?.transaction).user.findUnique({
      where: { email: email.value },
    });
    if (!user) return null;

    return this.convertToEntity(user);
  }

  async findById(id: Id, options?: TransactionOptions): Promise<User | null> {
    const user = await this.prisma.or(options?.transaction).user.findUnique({
      where: { id: id.value },
    });
    if (!user) return null;

    return this.convertToEntity(user);
  }

  async add(user: User, options?: TransactionOptions): Promise<void> {
    await this.prisma.or(options?.transaction).user.create({
      data: {
        id: user.id.value,
        name: user.name.value,
        email: user.email.value,
      },
    });
  }

  private convertToEntity(data: UserData): User {
    return User.load({
      id: new Id(data.id),
      name: new Name(data.name),
      email: new Email(data.email),
    });
  }
}