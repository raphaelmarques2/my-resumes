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

  describe('getResumeById', () => {
    it('should return a resume', async () => {
      const { id } = await tester.createResume();
      const resume = await resumeUseCases.getResumeById(id);
      expect(resume).toEqual(
        expect.objectContaining({
          id,
          userId: tester.auth.user.id,
        }),
      );
    });
    it('should throw error if the resume does not exist', async () => {
      await expect(
        resumeUseCases.getResumeById(faker.string.uuid()),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
