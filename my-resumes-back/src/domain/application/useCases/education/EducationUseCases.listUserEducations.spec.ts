import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { EducationUseCases } from './EducationUseCases';

describe('EducationUseCases', () => {
  const tester = createUseCaseTester();
  let educationUseCases: EducationUseCases;

  beforeAll(async () => {
    educationUseCases = new EducationUseCases(tester.prisma);
  });

  describe('listUserEducations', () => {
    it('should retrieve user educations', async () => {
      const educationA = await tester.createEducation();
      const educationB = await tester.createEducation();
      const educationC = await tester.createEducation();

      const result = await educationUseCases.listUserEducations(
        tester.auth.user.id,
      );
      expect(result).toHaveLength(3);

      const resultA = result.find((e) => e.id === educationA.id);
      const resultB = result.find((e) => e.id === educationB.id);
      const resultC = result.find((e) => e.id === educationC.id);

      expect(resultA).toEqual(educationA);
      expect(resultB).toEqual(educationB);
      expect(resultC).toEqual(educationC);
    });

    it('should not return educations from other users', async () => {
      const userA = await tester.createUser();
      const userB = await tester.createUser();

      await tester.createEducation({ userId: userA.user.id });
      await tester.createEducation({ userId: userB.user.id });
      await tester.createEducation({ userId: userA.user.id });
      await tester.createEducation({ userId: userB.user.id });
      await tester.createEducation({ userId: userA.user.id });

      const resultA = await educationUseCases.listUserEducations(userA.user.id);
      const resultB = await educationUseCases.listUserEducations(userB.user.id);

      expect(resultA).toHaveLength(3);
      expect(resultB).toHaveLength(2);
    });

    it('should return empty array if user has no education', async () => {
      const result = await educationUseCases.listUserEducations(
        tester.auth.user.id,
      );
      expect(result).toHaveLength(0);
    });
  });
});
