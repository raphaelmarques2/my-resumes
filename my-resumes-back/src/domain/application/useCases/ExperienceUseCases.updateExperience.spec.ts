import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { ExperienceUseCases } from './ExperienceUseCases';
import { NotFoundException } from '@nestjs/common';

describe('ExperienceUseCases', () => {
  const tester = createUseCaseTester();
  let experienceUseCases: ExperienceUseCases;

  beforeAll(async () => {
    experienceUseCases = new ExperienceUseCases(tester.prisma);
  });

  describe('updateExperience', () => {
    it('should update an experience with alll fields', async () => {
      const experience = await tester.createExperience();
      const startDate = new Date('2023-01-02').toISOString();
      const endDate = new Date('2023-01-03').toISOString();
      const updated = await experienceUseCases.updateExperience(experience.id, {
        title: 'title2',
        company: 'company2',
        description: 'description2',
        startDate: startDate,
        endDate: endDate,
        technologies: ['X', 'Y'],
      });
      expect(updated).toEqual({
        id: expect.any(String),
        title: 'title2',
        company: 'company2',
        description: 'description2',
        startDate: startDate,
        endDate: endDate,
        technologies: ['X', 'Y'],
        userId: tester.auth.user.id,
      });
    });
    it('should update an experience with one field', async () => {
      const experience = await tester.createExperience();
      const updated = await experienceUseCases.updateExperience(experience.id, {
        title: 'title2',
      });
      expect(updated.title).toBe('title2');
    });
    it('should update an experience with empty technologies', async () => {
      const experience = await tester.createExperience();
      const updated = await experienceUseCases.updateExperience(experience.id, {
        technologies: [],
      });
      expect(updated.technologies).toEqual([]);
    });
    it('should update an experience changing start-end dates', async () => {
      const experience = await tester.createExperience();
      const startDate = new Date('2023-01-02').toISOString();
      const endDate = new Date('2023-01-03').toISOString();
      const updated1 = await experienceUseCases.updateExperience(
        experience.id,
        { startDate, endDate },
      );
      expect(updated1).toEqual(
        expect.objectContaining({
          startDate,
          endDate,
        }),
      );
      const updated2 = await experienceUseCases.updateExperience(
        experience.id,
        { startDate: '', endDate: '' },
      );
      expect(updated2).toEqual(
        expect.objectContaining({
          startDate: undefined,
          endDate: undefined,
        }),
      );
    });

    it('should throw an error if experience does not exist', async () => {
      await expect(
        experienceUseCases.updateExperience('123', {}),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
