import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { UserDto } from '../dtos/UserDto';

@Injectable()
export class UserUseCases {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return UserDto.fromEntity(user);
  }
}
