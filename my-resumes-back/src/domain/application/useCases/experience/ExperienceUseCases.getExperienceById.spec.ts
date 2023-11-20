import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { ExperienceUseCases } from './ExperienceUseCases';

describe('ExperienceUseCases', () => {
  const tester = createUseCaseTester();
  let experienceUseCases: ExperienceUseCases;

  beforeAll(async () => {
    experienceUseCases = new ExperienceUseCases(tester.prisma);
  });

  describe('getExperienceById', () => {
    it('should retrieve an experience', async () => {
      const { id } = await tester.createExperience();
      const result = await experienceUseCases.getExperienceById(id);
      expect(result).toEqual(
        expect.objectContaining({
          id,
          userId: tester.auth.user.id,
        }),
      );
    });

    it('should throw an error if user does not exist', async () => {
      await expect(
        experienceUseCases.getExperienceById(faker.string.uuid()),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
