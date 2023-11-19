import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { ResumeUseCases } from './ResumeUseCases';
import { CreateResumeDto } from './dtos/CreateResumeDto';
import { faker } from '@faker-js/faker';

describe('ResumeUseCases', () => {
  const tester = createUseCaseTester();
  let resumeUseCases: ResumeUseCases;

  beforeAll(async () => {
    resumeUseCases = new ResumeUseCases(tester.prisma);
  });

  describe('createResume', () => {
    it('should create resume without description', async () => {
      const input: CreateResumeDto = {
        userId: tester.auth.user.id,
        title: faker.lorem.sentence(),
      };
      const resume = await resumeUseCases.createResume(input);
      expect(resume).toEqual({
        id: expect.any(String),
        userId: tester.auth.user.id,
        title: input.title,
        description: '',
        experiences: [],
      });
    });
    it('should create resume with description', async () => {
      const input: CreateResumeDto = {
        userId: tester.auth.user.id,
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
      };
      const resume = await resumeUseCases.createResume(input);
      expect(resume).toEqual({
        id: expect.any(String),
        userId: tester.auth.user.id,
        title: input.title,
        description: input.description,
        experiences: [],
      });
    });
    it('should create resume with experiences', async () => {
      const experiences = [
        await tester.createExperience(),
        await tester.createExperience(),
        await tester.createExperience(),
      ].map((e) => e.id);

      const input: CreateResumeDto = {
        userId: tester.auth.user.id,
        title: faker.lorem.sentence(),
        experiences,
      };
      const resume = await resumeUseCases.createResume(input);
      expect(resume).toEqual({
        id: expect.any(String),
        userId: tester.auth.user.id,
        title: input.title,
        description: '',
        experiences,
      });
    });
  });
});
