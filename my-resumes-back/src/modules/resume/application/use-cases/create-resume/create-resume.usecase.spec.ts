import { faker } from '@faker-js/faker';
import { MemoryUseCaseTester } from 'src/modules/common/tests/MemoryUseCaseTester';
import { CreateResumeDto } from './CreateResumeDto';
import { CreateResumeUseCase } from './create-resume.usecase';

describe('createResume', () => {
  let tester: MemoryUseCaseTester;
  let createResume: CreateResumeUseCase;

  beforeAll(async () => {
    tester = new MemoryUseCaseTester();
    createResume = new CreateResumeUseCase(
      tester.userRepository,
      tester.resumeRepository,
    );
  });
  it('should create resume without description', async () => {
    const auth = await tester.signup();
    const input: CreateResumeDto = {
      userId: auth.user.id,
      title: faker.lorem.sentence(),
    };
    const resume = await createResume.execute(input);
    expect(resume).toEqual({
      id: expect.any(String),
      userId: auth.user.id,
      title: input.title,
      name: 'Name',
      updatedAt: expect.toBeIsoDate(),
      description: '',
      experiences: [],
      educations: [],
    });
  });
  it('should create resume with description', async () => {
    const auth = await tester.signup();
    const input: CreateResumeDto = {
      userId: auth.user.id,
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
    };
    const resume = await createResume.execute(input);
    expect(resume).toEqual({
      id: expect.any(String),
      userId: auth.user.id,
      title: input.title,
      name: 'Name',
      updatedAt: expect.toBeIsoDate(),
      description: input.description,
      experiences: [],
      educations: [],
    });
  });
  it('should create resume with experiences', async () => {
    const auth = await tester.signup();
    const experiences = [
      await tester.createExperience({ userId: auth.user.id }),
      await tester.createExperience({ userId: auth.user.id }),
      await tester.createExperience({ userId: auth.user.id }),
    ].map((e) => e.id);

    const input: CreateResumeDto = {
      userId: auth.user.id,
      title: faker.lorem.sentence(),
      experiences,
    };
    const resume = await createResume.execute(input);
    expect(resume).toEqual({
      id: expect.any(String),
      userId: auth.user.id,
      title: input.title,
      name: 'Name',
      updatedAt: expect.toBeIsoDate(),
      description: '',
      experiences,
      educations: [],
    });
  });
});
