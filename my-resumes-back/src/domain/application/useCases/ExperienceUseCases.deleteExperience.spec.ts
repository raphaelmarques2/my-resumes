import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { ExperienceUseCases } from './ExperienceUseCases';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('ExperienceUseCases', () => {
  const tester = createUseCaseTester();
  let experienceUseCases: ExperienceUseCases;

  beforeAll(async () => {
    experienceUseCases = new ExperienceUseCases(tester.prisma);
  });

  describe('deleteExperience', () => {
    it('should delete an experience out of resumes', async () => {
      const experience = await tester.createExperience();
      await experienceUseCases.deleteExperience(experience.id);

      await expect(
        tester.prisma.experience.findUnique({ where: { id: experience.id } }),
      ).resolves.toBe(null);
    });
    it('should delete an experiences inside resumes', async () => {
      const experience = await tester.createExperience();
      const resume = await tester.createResume({
        experiences: [experience.id],
      });
      await experienceUseCases.deleteExperience(experience.id);

      await expect(
        tester.prisma.experience.findUnique({ where: { id: experience.id } }),
      ).resolves.toBe(null);

      await expect(
        tester.prisma.experienceToResume.findMany({
          where: {
            experienceId: experience.id,
            resumeId: resume.id,
          },
        }),
      ).resolves.toEqual([]);
    });
    it('should throw error if experience does not exist', async () => {
      await expect(
        experienceUseCases.deleteExperience(faker.string.uuid()),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
