import { BadRequestException } from '@nestjs/common';
import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { CreateExperienceDto } from '../dtos/CreateExperienceDto';
import { ExperienceUseCases } from './ExperienceUseCases';
import { faker } from '@faker-js/faker';

describe('ExperienceUseCases', () => {
  const tester = createUseCaseTester();
  let experienceUseCases: ExperienceUseCases;

  beforeAll(async () => {
    experienceUseCases = new ExperienceUseCases(tester.prisma);
  });

  describe('getExperienceById', () => {
    it('should retrieve an experience', async () => {
      const input: CreateExperienceDto = {
        title: 'title',
        company: 'abc',
        userId: tester.auth.user.id,
      };
      const result = await experienceUseCases.createExperience(input);
      expect(result).toEqual({
        id: expect.any(String),
        title: input.title,
        company: input.company,
        userId: input.userId,
        description: '',
        technologies: [],
        startDate: undefined,
        endDate: undefined,
      });
    });
    it('should create an experience with empty technologies', async () => {
      const input: CreateExperienceDto = {
        title: 'title',
        company: 'abc',
        userId: tester.auth.user.id,
        technologies: [],
      };
      const result = await experienceUseCases.createExperience(input);
      expect(result).toEqual(
        expect.objectContaining({
          technologies: [],
        }),
      );
    });
    it('should create an experience with technologies', async () => {
      const input: CreateExperienceDto = {
        title: 'title',
        company: 'abc',
        userId: tester.auth.user.id,
        technologies: ['A', 'B', 'C'],
      };
      const result = await experienceUseCases.createExperience(input);
      expect(result).toEqual(
        expect.objectContaining({
          technologies: ['A', 'B', 'C'],
        }),
      );
    });

    it('should throw an error if user does not exist', async () => {
      const input: CreateExperienceDto = {
        title: 'title',
        company: 'company',
        userId: faker.string.uuid(),
      };
      await expect(experienceUseCases.createExperience(input)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
