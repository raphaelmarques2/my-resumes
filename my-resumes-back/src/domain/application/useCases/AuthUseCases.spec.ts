import { AuthUseCases } from './AuthUseCases';
import { SignupDto } from '../dtos/SignupDto';
import { AuthTokenService } from '../services/AuthTokenService';
import { PasswordService } from '../services/PasswordService';
import { PrismaService } from '../services/PrismaService';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/LoginDto';
import {
  createTempSchemaAndMigrate,
  cleanDatabase,
} from 'src/infra/tests/db-test';

describe('AuthUseCases Integration Tests', () => {
  let authUseCases: AuthUseCases;
  let prisma: PrismaService;

  beforeAll(async () => {
    prisma = await createTempSchemaAndMigrate();
    const jwtService = new JwtService({ secretOrPrivateKey: 'test' });
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
  });
});
