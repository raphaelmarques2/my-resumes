import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthTokenService } from 'src/domain/application/services/AuthTokenService';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { AuthOutputDto } from '../dtos/AuthOutputDto';
import { LoginDto } from '../dtos/LoginDto';
import { SignupDto } from '../dtos/SignupDto';
import { UserDto } from '../dtos/UserDto';
import { PasswordService } from '../services/PasswordService';

@Injectable()
export class AuthUseCases {
  constructor(
    private authTokenService: AuthTokenService,
    private passwordService: PasswordService,
    private prisma: PrismaService,
  ) {}

  async signup(input: SignupDto): Promise<AuthOutputDto> {
    const userFound = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (userFound) {
      throw new BadRequestException('Email already in use');
    }

    const passwordHash = await this.passwordService.hashPassword(
      input.password,
    );

    const user = await this.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        credential: {
          create: {
            password: passwordHash,
          },
        },
        profiles: {
          create: {
            name: input.name,
            email: input.email,
          },
        },
      },
    });

    const token = await this.authTokenService.generateToken({
      userId: user.id,
      email: user.email,
    });
    return {
      token,
      user: UserDto.fromEntity(user),
    };
  }

  async login(input: LoginDto): Promise<AuthOutputDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
      include: {
        credential: true,
      },
    });

    if (!user || !user.credential) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      input.password,
      user.credential.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const token = await this.authTokenService.generateToken({
      userId: user.id,
      email: user.email,
    });
    return {
      token,
      user: UserDto.fromEntity(user),
    };
  }

  async authenticate(token: string): Promise<AuthOutputDto> {
    const tokenData = await this.authTokenService.extractToken(token);

    const user = await this.prisma.user.findUnique({
      where: { id: tokenData.userId },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const newToken = await this.authTokenService.generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      token: newToken,
      user: UserDto.fromEntity(user),
    };
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        credential: true,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }

    const passwordHash = await this.passwordService.hashPassword(newPassword);

    await this.prisma.userCredential.update({
      where: { userId: userId },
      data: {
        userId: userId,
        password: passwordHash,
      },
    });
  }
}
