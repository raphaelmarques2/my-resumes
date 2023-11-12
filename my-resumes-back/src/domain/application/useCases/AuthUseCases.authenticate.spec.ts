import { UnauthorizedException } from '@nestjs/common';
import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
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

  describe('authenticate', () => {
    it('should authenticate token', async () => {
      const result = await authUseCases.authenticate(tester.auth.token);
      expect(result).toEqual({
        token: expect.any(String),
        user: tester.auth.user,
      });
    });
    it('should throw with a invalid token', async () => {
      await expect(authUseCases.authenticate('invalid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
