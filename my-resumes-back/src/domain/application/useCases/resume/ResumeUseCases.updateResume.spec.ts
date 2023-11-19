import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { ResumeUseCases } from './ResumeUseCases';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { UpdateResumeDto } from './dtos/UpdateResumeDto';

describe('ResumeUseCases', () => {
  const tester = createUseCaseTester();
  let resumeUseCases: ResumeUseCases;

  beforeAll(async () => {
    resumeUseCases = new ResumeUseCases(tester.prisma);
  });

  describe('updateResume', () => {
    it('should update resume properties', async () => {
      const { id } = await tester.createResume({
        title: 'title1',
        description: 'description1',
        experiences: [],
      });

      const input: UpdateResumeDto = {
        title: 'title2',
        description: 'description2',
      };
      const resume = await resumeUseCases.updateResume(id, input);
      expect(resume).toEqual(
        expect.objectContaining({
          title: input.title,
          description: input.description,
          experiences: [],
        }),
      );
    });
    it('should update resume experiences', async () => {
      const experiences = [
        await tester.createExperience(),
        await tester.createExperience(),
        await tester.createExperience(),
        await tester.createExperience(),
        await tester.createExperience(),
      ].map((e) => e.id);

      const experiencesBefore = [1, 2, 3].map((i) => experiences[i]);
      const experiencesAfter = [4, 3, 0].map((i) => experiences[i]);

      const { id } = await tester.createResume({
        title: 'title1',
        description: 'description1',
        experiences: experiencesBefore,
      });

      const input: UpdateResumeDto = {
        experiences: experiencesAfter,
      };
      const resume = await resumeUseCases.updateResume(id, input);
      expect(resume).toEqual(
        expect.objectContaining({
          title: 'title1',
          description: 'description1',
          experiences: experiencesAfter,
        }),
      );
    });

    it('should throw error if resume does not exist', async () => {
      await expect(
        resumeUseCases.updateResume(faker.string.uuid(), {}),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
