import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { ProfileUseCases } from './ProfileUseCases';
import { UpdateProfileDto } from './dtos/UpdateProfileDto';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

describe('ProfileUseCases', () => {
  const tester = createUseCaseTester();
  let profileUseCases: ProfileUseCases;

  beforeAll(async () => {
    profileUseCases = new ProfileUseCases(tester.prisma);
  });

  describe('updateProfile', () => {
    it('should update profile', async () => {
      const profile = await profileUseCases.getUserProfile(tester.auth.user.id);

      const input: UpdateProfileDto = {
        name: faker.internet.userName(),
        address: faker.lorem.sentence(),
        email: faker.internet.email(),
        linkedin: faker.internet.url(),
      };
      const updatedProfile = await profileUseCases.updateProfile(
        profile.id,
        input,
      );
      expect(updatedProfile).toEqual({
        id: profile.id,
        userId: profile.userId,
        name: input.name,
        address: input.address,
        email: input.email,
        linkedin: input.linkedin,
      });
    });
    it('should throw error if profile does not exist', async () => {
      await expect(
        profileUseCases.updateProfile(faker.string.uuid(), {}),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
