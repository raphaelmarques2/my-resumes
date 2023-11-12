import { UnauthorizedException } from '@nestjs/common';
import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { LoginDto } from '../dtos/LoginDto';
import { SignupDto } from '../dtos/SignupDto';
import { AuthUseCases } from './AuthUseCases';

describe('AuthUseCases', () => {
  const tester = createUseCaseTester();
  let authUseCases: AuthUseCases;

  beforeAll(async () => {
    authUseCases = new AuthUseCases(
      tester.authTokenService,
      tester.passwordService,
      tester.prisma,
    );
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
