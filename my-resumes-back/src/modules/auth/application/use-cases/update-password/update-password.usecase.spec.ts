import { MemoryUseCaseTester } from 'src/modules/common/tests/MemoryUseCaseTester';
import { UpdatePasswordUseCase } from './update-password.usecase';
import { BadRequestException } from '@nestjs/common';

describe('updatePassword', () => {
  let tester: MemoryUseCaseTester;
  let updatePassword: UpdatePasswordUseCase;

  beforeEach(() => {
    tester = new MemoryUseCaseTester();
    updatePassword = new UpdatePasswordUseCase(
      tester.userRepository,
      tester.credentialRepository,
      tester.passwordService,
    );
  });

  it('should update user password', async () => {
    const auth = await tester.signup();
    const newPassword = 'a-new-password';
    await updatePassword.execute({
      userId: auth.user.id,
      password: newPassword,
    });
    const result = await tester.login({
      email: auth.user.email,
      password: newPassword,
    });
    expect(result.token).toBeDefined();
  });
  it('should throw with a invalid password', async () => {
    const auth = await tester.signup();
    const invalidPassword = '0';
    await expect(
      updatePassword.execute({
        userId: auth.user.id,
        password: invalidPassword,
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
