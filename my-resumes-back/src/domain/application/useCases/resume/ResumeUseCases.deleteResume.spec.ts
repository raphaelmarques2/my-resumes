import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { ResumeUseCases } from './ResumeUseCases';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

describe('ResumeUseCases', () => {
  const tester = createUseCaseTester();
  let resumeUseCases: ResumeUseCases;

  beforeAll(async () => {
    resumeUseCases = new ResumeUseCases(tester.prisma);
  });

  describe('deleteResume', () => {
    it('should delete a resume without experiences', async () => {
      const resume = await resumeUseCases.createResume({
        title: 'A',
        userId: tester.auth.user.id,
      });
      await resumeUseCases.deleteResume(resume.id);

      expect(
        await tester.prisma.resume.findUnique({ where: { id: resume.id } }),
      ).toBe(null);
    });
    it('should delete a resume with experiences', async () => {
      const experiences = [
        await tester.createExperience(),
        await tester.createExperience(),
        await tester.createExperience(),
      ].map((e) => e.id);

      const resume = await resumeUseCases.createResume({
        title: 'A',
        userId: tester.auth.user.id,
        experiences,
      });
      await resumeUseCases.deleteResume(resume.id);

      expect(
        await tester.prisma.resume.findUnique({ where: { id: resume.id } }),
      ).toBe(null);
    });
    it('should throw error if the resume does not exist', async () => {
      await expect(
        resumeUseCases.deleteResume(faker.string.uuid()),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
