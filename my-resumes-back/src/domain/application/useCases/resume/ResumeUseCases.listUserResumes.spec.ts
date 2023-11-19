import { createUseCaseTester } from 'src/infra/tests/UseCaseTester';
import { ResumeUseCases } from './ResumeUseCases';

describe('ResumeUseCases', () => {
  const tester = createUseCaseTester();
  let resumeUseCases: ResumeUseCases;

  beforeAll(async () => {
    resumeUseCases = new ResumeUseCases(tester.prisma);
  });

  describe('listUserResumes', () => {
    it('should return a list of resumes', async () => {
      const auth = await tester.createUser();

      await tester.createResume({ title: 'A', userId: auth.user.id });
      await tester.createResume({ title: 'B', userId: auth.user.id });
      await tester.createResume({ title: 'C', userId: auth.user.id });

      const resumes = await resumeUseCases.listUserResumes(auth.user.id);
      expect(resumes).toEqual([
        expect.objectContaining({ title: 'A', userId: auth.user.id }),
        expect.objectContaining({ title: 'B', userId: auth.user.id }),
        expect.objectContaining({ title: 'C', userId: auth.user.id }),
      ]);
    });
    it('should return an empty list of resumes', async () => {
      const auth = await tester.createUser();

      const resumes = await resumeUseCases.listUserResumes(auth.user.id);
      expect(resumes).toEqual([]);
    });
  });
});
