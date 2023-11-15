import { faker } from '@faker-js/faker';
import { ResumeAndExperiencesId, ResumeDto } from './ResumeDto';

describe('ResumeDto', () => {
  describe('createFrom', () => {
    it('should create dto from entity with all fields', async () => {
      const resume: ResumeAndExperiencesId = {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        title: faker.internet.displayName(),
        description: faker.lorem.paragraph(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        experienceToResumes: [
          { experienceId: faker.string.uuid() },
          { experienceId: faker.string.uuid() },
          { experienceId: faker.string.uuid() },
        ],
      };
      const dto = ResumeDto.createFrom(resume);
      expect(dto).toEqual({
        id: resume.id,
        userId: resume.userId,
        title: resume.title,
        description: resume.description,
        experiences: resume.experienceToResumes.map((e) => e.experienceId),
      });
    });
    it('should create dto from entity with empty experiences', async () => {
      const resume: ResumeAndExperiencesId = {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        title: faker.internet.displayName(),
        description: faker.lorem.paragraph(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        experienceToResumes: [],
      };
      const dto = ResumeDto.createFrom(resume);
      expect(dto).toEqual({
        id: resume.id,
        userId: resume.userId,
        title: resume.title,
        description: resume.description,
        experiences: [],
      });
    });
  });
});
