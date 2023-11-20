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

  describe('updateEducation', () => {
    it('should update an education with all fields', async () => {
      const education = await tester.createEducation();
      const startDate = new Date('2023-01-02').toISOString();
      const endDate = new Date('2023-01-03').toISOString();
      const updated = await educationUseCases.updateEducation(education.id, {
        title: 'title2',
        institution: 'institution2',
        startDate: startDate,
        endDate: endDate,
      });
      expect(updated).toEqual({
        id: expect.any(String),
        title: 'title2',
        institution: 'institution2',
        startDate: startDate,
        endDate: endDate,
        userId: tester.auth.user.id,
      });
    });
    it('should update an education with one field', async () => {
      const education = await tester.createEducation();
      const updated = await educationUseCases.updateEducation(education.id, {
        title: 'title2',
      });
      expect(updated).toEqual(
        expect.objectContaining({
          title: 'title2',
        }),
      );
    });
    it('should update an education changing start-end dates', async () => {
      const education = await tester.createEducation();
      const startDate = new Date('2023-01-02').toISOString();
      const endDate = new Date('2023-01-03').toISOString();
      const updated1 = await educationUseCases.updateEducation(education.id, {
        startDate,
        endDate,
      });
      expect(updated1).toEqual(
        expect.objectContaining({
          startDate,
          endDate,
        }),
      );
      const updated2 = await educationUseCases.updateEducation(education.id, {
        startDate: '',
        endDate: '',
      });
      expect(updated2).toEqual(
        expect.objectContaining({
          startDate: undefined,
          endDate: undefined,
        }),
      );
    });

    it('should throw an error if education does not exist', async () => {
      await expect(
        educationUseCases.updateEducation(faker.string.uuid(), {}),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
