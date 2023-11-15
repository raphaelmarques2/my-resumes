import { Experience } from '@prisma/client';
import { ExperienceDto } from './ExperienceDto';
import { faker } from '@faker-js/faker';

describe('ExperienceDto', () => {
  describe('createFrom', () => {
    it('should create dto from entity with all fields', async () => {
      const experience: Experience = {
        id: faker.string.uuid(),
        company: faker.internet.displayName(),
        description: faker.lorem.paragraph(),
        technologies: ['A', 'B', 'C'],
        title: faker.internet.displayName(),
        userId: faker.string.uuid(),
        startDate: new Date('2023/01/02'),
        endDate: new Date('2023/01/03'),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const dto = ExperienceDto.createFrom(experience);
      expect(dto).toEqual({
        id: experience.id,
        company: experience.company,
        description: experience.description,
        technologies: experience.technologies,
        title: experience.title,
        userId: experience.userId,
        startDate: new Date('2023/01/02').toISOString(),
        endDate: new Date('2023/01/03').toISOString(),
      });
    });
    it('should create dto from entity with empty startDate and endDate', async () => {
      const experience: Experience = {
        id: faker.string.uuid(),
        company: faker.internet.displayName(),
        description: faker.lorem.paragraph(),
        technologies: ['A', 'B', 'C'],
        title: faker.internet.displayName(),
        userId: faker.string.uuid(),
        startDate: null,
        endDate: null,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const dto = ExperienceDto.createFrom(experience);
      expect(dto).toEqual({
        id: experience.id,
        company: experience.company,
        description: experience.description,
        technologies: experience.technologies,
        title: experience.title,
        userId: experience.userId,
      });
    });
  });
});
