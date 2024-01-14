import { faker } from '@faker-js/faker';
import { User } from 'src/modules/auth/application/entities/User.entity';
import { Id } from 'src/modules/common/application/value-objects/Id';
import { Profile } from '../../application/entities/Profile.entity';
import { Email } from 'src/modules/common/application/value-objects/Email';
import { Name } from 'src/modules/common/application/value-objects/Name';
import { createRepositoryTester } from 'src/infra/tests/repository-tester';

describe('PrismaProfileRepository', () => {
  const { userRepository, profileRepository, transactionService } =
    createRepositoryTester();

  describe('add', () => {
    it('should add profile', async () => {
      const { user, profile } = createUserAndProfile();
      await userRepository.add(user);
      await profileRepository.add(profile);

      const profileFound = await profileRepository.findByUserId(user.id);
      expect(profileFound).toEqual(profile);
    });
    it('should throw error if profile already exists', async () => {
      const { user, profile } = createUserAndProfile();
      await userRepository.add(user);
      await profileRepository.add(profile);

      await expect(profileRepository.add(profile)).rejects.toThrow();
    });
    it('should use transaction', async () => {
      const { user, profile } = createUserAndProfile();

      await transactionService.transaction(async (transaction) => {
        await userRepository.add(user, { transaction });
        await profileRepository.add(profile, { transaction });
      });

      const profileFound = await profileRepository.findByUserId(user.id);
      expect(profileFound).toEqual(profile);
    });
  });
  describe('findByUserId', () => {
    it('should return null if profile does not exist', async () => {
      const user = createUser();
      await userRepository.add(user);

      const profileFound = await profileRepository.findByUserId(user.id);
      expect(profileFound).toBeNull();
    });
    it('should return profile if profile exists', async () => {
      const { user, profile } = createUserAndProfile();
      await userRepository.add(user);
      await profileRepository.add(profile);

      const profileFound = await profileRepository.findByUserId(user.id);
      expect(profileFound).toEqual(profile);
    });
    it('should use transaction', async () => {
      const { user, profile } = createUserAndProfile();
      await userRepository.add(user);
      await profileRepository.add(profile);

      const profileFound = await transactionService.transaction(
        async (transaction) => {
          return await profileRepository.findByUserId(user.id, {
            transaction,
          });
        },
      );
      expect(profileFound).toEqual(profile);
    });
  });
  describe('findById', () => {
    it('should return null if profile does not exist', async () => {
      const profileFound = await profileRepository.findById(
        new Id(faker.string.uuid()),
      );
      expect(profileFound).toBeNull();
    });
    it('should return profile if profile exists', async () => {
      const { user, profile } = createUserAndProfile();
      await userRepository.add(user);
      await profileRepository.add(profile);

      const profileFound = await profileRepository.findById(profile.id);
      expect(profileFound).toEqual(profile);
    });
    it('should use transaction', async () => {
      const { user, profile } = createUserAndProfile();
      await userRepository.add(user);
      await profileRepository.add(profile);

      const profileFound = await transactionService.transaction(
        async (transaction) => {
          return await profileRepository.findById(profile.id, {
            transaction,
          });
        },
      );
      expect(profileFound).toEqual(profile);
    });
  });
  describe('update', () => {
    it('should update profile with all fields', async () => {
      const { user, profile } = createUserAndProfile();
      await userRepository.add(user);
      await profileRepository.add(profile);

      profile.update({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.lorem.sentence(),
        linkedin: faker.internet.url(),
      });

      await profileRepository.update(profile);

      const profileFound = await profileRepository.findById(profile.id);
      expect(profileFound).toEqual(profile);
    });
    it('should update profile with empty fields', async () => {
      const { user, profile } = createUserAndProfile();
      await userRepository.add(user);
      await profileRepository.add(profile);

      profile.update({
        name: '',
        email: '',
        address: '',
        linkedin: '',
      });

      await profileRepository.update(profile);

      const profileFound = await profileRepository.findById(profile.id);
      expect(profileFound).toEqual(profile);
    });
    it('should throw error if profile does not exist', async () => {
      const { profile } = createUserAndProfile();

      await expect(profileRepository.update(profile)).rejects.toThrow();
    });
    it('should use transaction', async () => {
      const { user, profile } = createUserAndProfile();
      await userRepository.add(user);
      await profileRepository.add(profile);

      profile.update({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.lorem.sentence(),
        linkedin: faker.internet.url(),
      });

      await transactionService.transaction(async (transaction) => {
        await profileRepository.update(profile, { transaction });
      });

      const profileFound = await profileRepository.findById(profile.id);
      expect(profileFound).toEqual(profile);
    });
  });
});

function createUser() {
  return User.load({
    id: new Id(faker.string.uuid()),
    name: new Name(faker.person.fullName()),
    email: new Email(faker.internet.email()),
  });
}
function createProfile(user: User) {
  return Profile.load({
    id: new Id(faker.string.uuid()),
    userId: user.id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    address: faker.lorem.sentence(),
    linkedin: faker.internet.url(),
  });
}
function createUserAndProfile() {
  const user = createUser();
  const profile = createProfile(user);
  return { user, profile };
}
