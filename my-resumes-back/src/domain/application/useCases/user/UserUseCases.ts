import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { UserDto, convertToUserDto } from './dtos/UserDto';
import { validateId } from '../../services/validation';

@Injectable()
export class UserUseCases {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string): Promise<UserDto> {
    validateId(id);

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return convertToUserDto(user);
  }
}
