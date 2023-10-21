import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { Email } from 'src/domain/core/value-objects/Email';
import { User } from 'src/domain/core/entities/User';
import { Name } from 'src/domain/core/value-objects/Name';
import { UserDto } from '../dtos/UserDto';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { Id } from 'src/domain/core/value-objects/Id';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(input: CreateUserDto): Promise<UserDto> {
    const userFound = await this.userRepository.findByEmail(
      new Email(input.email),
    );
    if (userFound) {
      throw new BadRequestException('Email already in use');
    }

    const user = User.createNew({
      name: new Name(input.name),
      email: new Email(input.email),
    });
    await this.userRepository.save(user);

    return UserDto.fromEntity(user);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(new Email(email));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserDto.fromEntity(user);
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepository.load(new Id(id));
    return UserDto.fromEntity(user);
  }
}
