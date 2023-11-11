import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  cleanDatabase,
  createTempSchemaAndMigrate,
} from 'src/infra/tests/db-test';
import { LoginDto } from '../dtos/LoginDto';
import { SignupDto } from '../dtos/SignupDto';
import { AuthTokenService } from '../services/AuthTokenService';
import { PasswordService } from '../services/PasswordService';
import { PrismaService } from '../services/PrismaService';
import { AuthUseCases } from './AuthUseCases';

describe('AuthUseCases Integration Tests', () => {
  let authUseCases: AuthUseCases;
  let prisma: PrismaService;

  beforeAll(async () => {
    prisma = await createTempSchemaAndMigrate();
    const jwtService = new JwtService({ secret: 'test' });
    const authTokenService = new AuthTokenService(jwtService);
    const passwordService = new PasswordService();
    authUseCases = new AuthUseCases(authTokenService, passwordService, prisma);
  });

  beforeEach(async () => {
    await cleanDatabase(prisma);
  });

  afterAll(async () => {
    await cleanDatabase(prisma);
    await prisma.$disconnect();
  });

  describe('login', () => {
    it('should validate user login and return a token', async () => {
      const signupDto: SignupDto = {
        name: 'User',
        email: 'test@test.com',
        password: '123456789',
      };
      await authUseCases.signup(signupDto);

      const loginDto: LoginDto = {
        email: signupDto.email,
        password: signupDto.password,
      };
      const result = await authUseCases.login(loginDto);

      expect(result).toEqual({
        token: expect.any(String),
        user: {
          id: expect.any(String),
          name: 'User',
          email: 'test@test.com',
        },
      });
    });

    it('should throw an error if email does not exist', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: '123456789',
      };

      await expect(authUseCases.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an error if password is incorrect', async () => {
      const signupDto: SignupDto = {
        name: 'User',
        email: 'test@example.com',
        password: '123456789',
      };

      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongPassword',
      };

      await authUseCases.signup(signupDto);

      await expect(authUseCases.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
