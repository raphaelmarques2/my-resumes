import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  cleanDatabase,
  createTempSchemaAndMigrate,
} from 'src/infra/tests/db-test';
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

  describe('signup', () => {
    it('should create a new user and return a token', async () => {
      const signupDto: SignupDto = {
        name: 'User',
        email: 'test@test.com',
        password: '123456789',
      };
      const result = await authUseCases.signup(signupDto);
      expect(result).toEqual({
        token: expect.any(String),
        user: {
          id: expect.any(String),
          name: 'User',
          email: 'test@test.com',
        },
      });
    });
    it('should throw an error if email is already in use', async () => {
      const signupDto: SignupDto = {
        name: 'User',
        email: 'test@example.com',
        password: '123456789',
      };

      await authUseCases.signup(signupDto);

      await expect(authUseCases.signup(signupDto)).rejects.toThrow(
        BadRequestException,
      );
    });
    it('should throw an error for invalid email format', async () => {
      const signupDtoWithInvalidEmail: SignupDto = {
        name: 'User',
        email: 'invalid-email',
        password: '123456789',
      };

      await expect(
        authUseCases.signup(signupDtoWithInvalidEmail),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
