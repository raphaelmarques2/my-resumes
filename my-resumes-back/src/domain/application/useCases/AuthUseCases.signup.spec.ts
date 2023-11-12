import { BadRequestException } from '@nestjs/common';
import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { SignupDto } from '../dtos/SignupDto';
import { AuthUseCases } from './AuthUseCases';
import { ProfileUseCases } from './ProfileUseCases';

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
    it('should create a profile when user signs up', async () => {
      const signupDto: SignupDto = {
        name: 'User',
        email: 'test@test.com',
        password: '123456789',
      };
      const user = await authUseCases.signup(signupDto);

      const profileUseCases = new ProfileUseCases(tester.prisma);
      const profile = await profileUseCases.getUserProfile(user.user.id);
      expect(profile).toEqual(
        expect.objectContaining({
          name: signupDto.name,
          email: signupDto.email,
        }),
      );
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
