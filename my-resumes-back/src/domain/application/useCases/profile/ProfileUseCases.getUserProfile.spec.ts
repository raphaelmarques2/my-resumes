import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { ProfileUseCases } from './ProfileUseCases';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

describe('ProfileUseCases', () => {
  const tester = createUseCaseTester();
  let profileUseCases: ProfileUseCases;

  beforeAll(async () => {
    profileUseCases = new ProfileUseCases(tester.prisma);
  });

  describe('getUserProfile', () => {
    it('should return user profile', async () => {
      const profile = await profileUseCases.getUserProfile(tester.auth.user.id);
      expect(profile).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          userId: tester.auth.user.id,
        }),
      );
    });
    it('should throw error if user does not exist', async () => {
      await expect(
        profileUseCases.getUserProfile(faker.string.uuid()),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
