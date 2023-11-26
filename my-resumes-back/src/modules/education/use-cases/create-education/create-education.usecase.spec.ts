import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { MemoryUseCaseTester } from 'src/modules/common/tests/MemoryUseCaseTester';
import { CreateEducationDto } from './CreateEducationDto';
import { CreateEducationUseCase } from './create-education.usecase';

describe('createEducation', () => {
  let tester: MemoryUseCaseTester;
  let createEducation: CreateEducationUseCase;

  beforeAll(async () => {
    tester = new MemoryUseCaseTester();
    createEducation = new CreateEducationUseCase(
      tester.userRepository,
      tester.educationRepository,
    );
  });
  it('should create an education without dates', async () => {
    const auth = await tester.signup();
    const input: CreateEducationDto = {
      title: 'title',
      institution: 'abc',
      userId: auth.user.id,
    };
    const result = await createEducation.execute(input);
    expect(result).toEqual({
      id: expect.any(String),
      title: input.title,
      institution: input.institution,
      userId: input.userId,
      startDate: undefined,
      endDate: undefined,
    });
  });
  it('should create an education with dates', async () => {
    const auth = await tester.signup();
    const input: CreateEducationDto = {
      title: 'title',
      institution: 'abc',
      userId: auth.user.id,
      startDate: new Date('2020-01-02').toISOString(),
      endDate: new Date('2023-03-01').toISOString(),
    };
    const result = await createEducation.execute(input);
    expect(result).toEqual(
      expect.objectContaining({
        startDate: input.startDate,
        endDate: input.endDate,
      }),
    );
  });

  it('should throw an error if user does not exist', async () => {
    const input: CreateEducationDto = {
      title: 'title',
      institution: 'institution',
      userId: faker.string.uuid(),
    };
    await expect(createEducation.execute(input)).rejects.toThrow(
      BadRequestException,
    );
  });
});
