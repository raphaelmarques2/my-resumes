import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { ExperienceUseCases } from './ExperienceUseCases';

describe('ExperienceUseCases', () => {
  const tester = createUseCaseTester();
  let experienceUseCases: ExperienceUseCases;

  beforeAll(async () => {
    experienceUseCases = new ExperienceUseCases(tester.prisma);
  });

  describe('listUserExperiences', () => {
    it('should retrieve user experiences', async () => {
      const experienceA = await tester.createExperience();
      const experienceB = await tester.createExperience();
      const experienceC = await tester.createExperience();

      const result = await experienceUseCases.listUserExperiences(
        tester.auth.user.id,
      );
      expect(result).toHaveLength(3);

      const resultA = result.find((e) => e.id === experienceA.id);
      const resultB = result.find((e) => e.id === experienceB.id);
      const resultC = result.find((e) => e.id === experienceC.id);

      expect(resultA).toEqual(experienceA);
      expect(resultB).toEqual(experienceB);
      expect(resultC).toEqual(experienceC);
    });

    it('should not return experiences from other users', async () => {
      const userA = await tester.createUser();
      const userB = await tester.createUser();

      await tester.createExperience({ userId: userA.user.id });
      await tester.createExperience({ userId: userB.user.id });
      await tester.createExperience({ userId: userA.user.id });
      await tester.createExperience({ userId: userB.user.id });
      await tester.createExperience({ userId: userA.user.id });

      const resultA = await experienceUseCases.listUserExperiences(
        userA.user.id,
      );
      const resultB = await experienceUseCases.listUserExperiences(
        userB.user.id,
      );

      expect(resultA).toHaveLength(3);
      expect(resultB).toHaveLength(2);
    });

    it('should return empty array if user has no experience', async () => {
      const result = await experienceUseCases.listUserExperiences(
        tester.auth.user.id,
      );
      expect(result).toHaveLength(0);
    });
  });
});
