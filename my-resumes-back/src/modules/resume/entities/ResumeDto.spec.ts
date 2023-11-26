import { faker } from '@faker-js/faker';
import { ResumeDto } from './ResumeDto';
import { Resume } from './Resume.entity';
import { Id } from 'src/modules/common/domain/value-objects/Id';
import { Name } from 'src/modules/common/domain/value-objects/Name';

describe('ResumeDto', () => {
  describe('createFrom', () => {
    it('should create dto from entity with all fields', async () => {
      const resume = Resume.load({
        id: new Id(),
        userId: new Id(),
        title: new Name(faker.internet.displayName()),
        description: faker.lorem.paragraph(),
        experiences: [new Id(), new Id(), new Id()],
      });
      const dto = ResumeDto.createFrom(resume);
      expect(dto).toEqual({
        id: resume.id.value,
        userId: resume.userId.value,
        title: resume.title.value,
        description: resume.description,
        experiences: resume.experiences.map((e) => e.value),
      });
    });
    it('should create dto from entity with empty experiences', async () => {
      const resume = Resume.load({
        id: new Id(),
        userId: new Id(),
        title: new Name(faker.internet.displayName()),
        description: faker.lorem.paragraph(),
        experiences: [],
      });
      const dto = ResumeDto.createFrom(resume);
      expect(dto).toEqual({
        id: resume.id.value,
        userId: resume.userId.value,
        title: resume.title.value,
        description: resume.description,
        experiences: [],
      });
    });
  });
});
