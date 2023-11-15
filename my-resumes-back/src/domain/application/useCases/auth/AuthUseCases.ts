import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthTokenService } from 'src/domain/application/services/AuthTokenService';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { PasswordService } from '../../services/PasswordService';
import { validateDto } from '../../services/validation';
import { convertToUserDto } from '../user/dtos/UserDto';
import { AuthOutputDto } from './dtos/AuthOutputDto';
import { LoginDto, loginDtoSchema } from './dtos/LoginDto';
import { SignupDto, signupDtoSchema } from './dtos/SignupDto';
import {
  UpdatePasswordDto,
  updatePasswordDtoSchema,
} from './dtos/UpdatePasswordDto';

@Injectable()
export class AuthUseCases {
  constructor(
    private authTokenService: AuthTokenService,
    private passwordService: PasswordService,
    private prisma: PrismaService,
  ) {}

  async signup(input: SignupDto): Promise<AuthOutputDto> {
    validateDto(input, signupDtoSchema);

    const user = await this.prisma.$transaction(async (prisma) => {
      const userFound = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (userFound) {
        throw new BadRequestException('Email already in use');
      }

      const passwordHash = await this.passwordService.hashPassword(
        input.password,
      );

      const user = await prisma.user.create({
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

      return user;
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
      where: { email: input.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const credential = await this.prisma.$transaction(async (prisma) => {
      const credential = await prisma.userCredential.findFirst({
        where: { userId: user.id },
      });

      if (!credential) {
        //create credential if it does not exist
        const passwordHash = await this.passwordService.hashPassword(
          input.password,
        );

        const newCredential = await prisma.userCredential.create({
          data: {
            userId: user.id,
            password: passwordHash,
          },
        });
        return newCredential;
      }

      return credential;
    });

    const isPasswordValid = await this.passwordService.comparePasswords(
      input.password,
      credential.password,
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

    await this.prisma.userCredential.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        password: passwordHash,
      },
      update: {
        password: passwordHash,
      },
    });
  }
}
