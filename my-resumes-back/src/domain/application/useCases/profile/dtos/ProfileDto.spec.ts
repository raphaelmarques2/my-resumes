import { faker } from '@faker-js/faker';
import { Profile } from '@prisma/client';
import { ProfileDto } from './ProfileDto';

describe('ProfileDto', () => {
  describe('createFrom', () => {
    it('should create dto from entity with all fields', async () => {
      const profile: Profile = {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.internet.displayName(),
        address: faker.lorem.text(),
        linkedin: faker.internet.url(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const dto = ProfileDto.createFrom(profile);
      expect(dto).toEqual({
        id: profile.id,
        userId: profile.userId,
        email: profile.email,
        name: profile.name,
        address: profile.address,
        linkedin: profile.linkedin,
      });
    });
    it('should create dto without optional fields', async () => {
      const profile: Profile = {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.internet.displayName(),
        address: null,
        linkedin: null,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const dto = ProfileDto.createFrom(profile);
      expect(dto).toEqual({
        id: profile.id,
        userId: profile.userId,
        email: profile.email,
        name: profile.name,
      });
    });
  });
});
