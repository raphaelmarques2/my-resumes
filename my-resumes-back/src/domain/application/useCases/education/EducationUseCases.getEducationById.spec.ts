import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { EducationUseCases } from './EducationUseCases';

describe('EducationUseCases', () => {
  const tester = createUseCaseTester();
  let educationUseCases: EducationUseCases;

  beforeAll(async () => {
    educationUseCases = new EducationUseCases(tester.prisma);
  });

  describe('getEducationById', () => {
    it('should retrieve an education', async () => {
      const { id } = await tester.createEducation();
      const result = await educationUseCases.getEducationById(id);
      expect(result).toEqual(
        expect.objectContaining({
          id,
          userId: tester.auth.user.id,
        }),
      );
    });

    it('should throw an error if user does not exist', async () => {
      await expect(
        educationUseCases.getEducationById(faker.string.uuid()),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
