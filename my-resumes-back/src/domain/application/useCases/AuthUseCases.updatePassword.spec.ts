import { BadRequestException } from '@nestjs/common';
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

  describe('updatePassword', () => {
    it('should update user password', async () => {
      const newPassword = 'a-new-password';
      await authUseCases.updatePassword({
        userId: tester.auth.user.id,
        password: newPassword,
      });
      const result = await authUseCases.login({
        email: tester.auth.user.email,
        password: newPassword,
      });
      expect(result.token).toBeDefined();
    });
    it('should throw with a invalid password', async () => {
      const invalidPassword = '0';
      await expect(
        authUseCases.updatePassword({
          userId: tester.auth.user.id,
          password: invalidPassword,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
