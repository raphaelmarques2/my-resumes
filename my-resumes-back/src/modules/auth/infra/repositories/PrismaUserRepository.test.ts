import { createRepositoryTester } from 'src/infra/tests/repository-tester';
import { User } from '../../application/entities/User.entity';
import { Email } from 'src/modules/common/application/value-objects/Email';
import { Id } from 'src/modules/common/application/value-objects/Id';
import { Name } from 'src/modules/common/application/value-objects/Name';
import { faker } from '@faker-js/faker';

describe('PrismaUserRepository', () => {
  const { userRepository, transactionService } = createRepositoryTester();

  describe('findByEmail', () => {
    it('should return null if user does not exist', async () => {
      const userFound = await userRepository.findByEmail(
        new Email('email@test.com'),
      );
      expect(userFound).toBeNull();
    });
    it('should return user if user exists', async () => {
      const user = createUser();
      await userRepository.add(user);

      const userFound = await userRepository.findByEmail(user.email);
      expect(userFound).toEqual(user);
    });
    it('should use transaction', async () => {
      const user = createUser();
      await userRepository.add(user);

      const userFound = await transactionService.transaction(
        async (transaction) => {
          return await userRepository.findByEmail(user.email, { transaction });
        },
      );

      expect(userFound).toEqual(user);
    });
  });
  describe('findById', () => {
    it('should return null if user does not exist', async () => {
      const userFound = await userRepository.findById(
        new Id(faker.string.uuid()),
      );
      expect(userFound).toBeNull();
    });
    it('should return user if user exists', async () => {
      const user = createUser();
      await userRepository.add(user);

      const userFound = await userRepository.findById(user.id);
      expect(userFound).toEqual(user);
    });

    it('should use transaction', async () => {
      const user = createUser();
      await userRepository.add(user);

      const userFound = await transactionService.transaction(
        async (transaction) => {
          return await userRepository.findById(user.id, { transaction });
        },
      );

      expect(userFound).toEqual(user);
    });
  });
  describe('userExists', () => {
    it('should return false if user does not exist', async () => {
      const userExists = await userRepository.userExists(
        new Id(faker.string.uuid()),
      );
      expect(userExists).toBeFalsy();
    });
    it('should return true if user exists', async () => {
      const user = createUser();
      await userRepository.add(user);

      const userExists = await userRepository.userExists(user.id);
      expect(userExists).toBeTruthy();
    });
    it('should use transaction', async () => {
      const user = createUser();
      await userRepository.add(user);

      const userExists = await transactionService.transaction(
        async (transaction) => {
          return await userRepository.userExists(user.id, { transaction });
        },
      );

      expect(userExists).toBeTruthy();
    });
  });
  describe('add', () => {
    it('should add user', async () => {
      const user = createUser();
      await userRepository.add(user);

      const userFound = await userRepository.findById(user.id);
      expect(userFound).toEqual(user);
    });
    it('should throw error if user already exists', async () => {
      const user = createUser();
      await userRepository.add(user);

      await expect(userRepository.add(user)).rejects.toThrow();
    });
    it('should use transaction', async () => {
      const user = createUser();
      await transactionService.transaction(async (transaction) => {
        await userRepository.add(user, { transaction });
      });

      const userFound = await userRepository.findById(user.id);
      expect(userFound).toEqual(user);
    });
  });
});

function createUser() {
  const user = User.load({
    id: new Id(faker.string.uuid()),
    name: new Name(faker.person.fullName()),
    email: new Email(faker.internet.email()),
  });
  return user;
}
