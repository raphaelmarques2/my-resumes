import { faker } from '@faker-js/faker';
import { UserDto } from './UserDto';
import { User } from '@prisma/client';

describe('UserDto', () => {
  describe('createFrom', () => {
    it('should create dto from entity with all fields', async () => {
      const user: User = {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const dto = UserDto.createFrom(user);
      expect(dto).toEqual({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    });
  });
});
