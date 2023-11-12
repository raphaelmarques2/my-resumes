import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthTokenService } from 'src/domain/application/services/AuthTokenService';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { AuthOutputDto } from '../dtos/AuthOutputDto';
import { LoginDto, loginDtoSchema } from '../dtos/LoginDto';
import { SignupDto, signupDtoSchema } from '../dtos/SignupDto';
import { convertToUserDto } from '../dtos/UserDto';
import { validateDto } from '../dtos/validate';
import { PasswordService } from '../services/PasswordService';
import {
  UpdatePasswordDto,
  updatePasswordDtoSchema,
} from '../dtos/UpdatePasswordDto';

@Injectable()
export class AuthUseCases {
  constructor(
    private authTokenService: AuthTokenService,
    private passwordService: PasswordService,
    private prisma: PrismaService,
  ) {}

  async signup(input: SignupDto): Promise<AuthOutputDto> {
    validateDto(input, signupDtoSchema);

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
      user: convertToUserDto(user),
    };
  }

  async login(input: LoginDto): Promise<AuthOutputDto> {
    validateDto(input, loginDtoSchema);

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
      user: convertToUserDto(user),
    };
  }

  async authenticate(token: string): Promise<AuthOutputDto> {
    const tokenData = await this.authTokenService
      .extractToken(token)
      .catch(() => {
        throw new UnauthorizedException();
      });

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
      user: convertToUserDto(user),
    };
  }

  async updatePassword(input: UpdatePasswordDto): Promise<void> {
    validateDto(input, updatePasswordDtoSchema);

    const user = await this.prisma.user.findUnique({
      where: { id: input.userId },
      include: {
        credential: true,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }

    const passwordHash = await this.passwordService.hashPassword(
      input.password,
    );

    await this.prisma.userCredential.update({
      where: { userId: input.userId },
      data: {
        userId: input.userId,
        password: passwordHash,
      },
    });
  }
}
