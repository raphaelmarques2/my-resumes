import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { EducationUseCases } from './EducationUseCases';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('EducationUseCases', () => {
  const tester = createUseCaseTester();
  let educationUseCases: EducationUseCases;

  beforeAll(async () => {
    educationUseCases = new EducationUseCases(tester.prisma);
  });

  describe('deleteEducation', () => {
    it('should delete an education out of resumes', async () => {
      const education = await tester.createEducation();
      await educationUseCases.deleteEducation(education.id);

      await expect(
        tester.prisma.education.findUnique({ where: { id: education.id } }),
      ).resolves.toBe(null);
    });
    it('should throw error if education does not exist', async () => {
      await expect(
        educationUseCases.deleteEducation(faker.string.uuid()),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
