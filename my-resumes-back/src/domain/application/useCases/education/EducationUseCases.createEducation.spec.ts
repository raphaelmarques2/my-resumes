import { BadRequestException } from '@nestjs/common';
import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { CreateEducationDto } from './dtos/CreateEducationDto';
import { EducationUseCases } from './EducationUseCases';

describe('EducationUseCases', () => {
  const tester = createUseCaseTester();
  let educationUseCases: EducationUseCases;

  beforeAll(async () => {
    educationUseCases = new EducationUseCases(tester.prisma);
  });

  describe('createEducation', () => {
    it('should create an education without dates', async () => {
      const input: CreateEducationDto = {
        title: 'title',
        institution: 'abc',
        userId: tester.auth.user.id,
      };
      const result = await educationUseCases.createEducation(input);
      expect(result).toEqual({
        id: expect.any(String),
        title: input.title,
        institution: input.institution,
        userId: input.userId,
        startDate: undefined,
        endDate: undefined,
      });
    });
    it('should create an education with dates', async () => {
      const input: CreateEducationDto = {
        title: 'title',
        institution: 'abc',
        userId: tester.auth.user.id,
        startDate: new Date('2020-01-02').toISOString(),
        endDate: new Date('2023-03-01').toISOString(),
      };
      const result = await educationUseCases.createEducation(input);
      expect(result).toEqual(
        expect.objectContaining({
          startDate: input.startDate,
          endDate: input.endDate,
        }),
      );
    });

    it('should throw an error if user does not exist', async () => {
      const input: CreateEducationDto = {
        title: 'title',
        institution: 'institution',
        userId: '123',
      };
      await expect(educationUseCases.createEducation(input)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
