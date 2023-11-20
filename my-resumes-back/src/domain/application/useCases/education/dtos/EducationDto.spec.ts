import { Education } from '@prisma/client';
import { EducationDto } from './EducationDto';
import { faker } from '@faker-js/faker';

describe('EducationDto', () => {
  describe('createFrom', () => {
    it('should create dto from entity with all fields', async () => {
      const education: Education = {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        title: faker.internet.displayName(),
        institution: faker.internet.displayName(),
        startDate: new Date('2023/01/02'),
        endDate: new Date('2023/01/03'),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const dto = EducationDto.createFrom(education);
      expect(dto).toEqual({
        id: education.id,
        userId: education.userId,
        title: education.title,
        institution: education.institution,
        startDate: new Date('2023/01/02').toISOString(),
        endDate: new Date('2023/01/03').toISOString(),
      });
    });
    it('should create dto from entity with empty startDate and endDate', async () => {
      const education: Education = {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        title: faker.internet.displayName(),
        institution: faker.internet.displayName(),
        startDate: null,
        endDate: null,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const dto = EducationDto.createFrom(education);
      expect(dto).toEqual({
        id: education.id,
        userId: education.userId,
        title: education.title,
        institution: education.institution,
      });
    });
  });
});
