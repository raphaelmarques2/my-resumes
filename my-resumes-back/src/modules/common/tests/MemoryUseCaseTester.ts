import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenService } from 'src/modules/auth/application/services/AuthTokenService';
import { PasswordService } from 'src/modules/auth/application/services/PasswordService';
import { AuthOutputDto } from 'src/modules/auth/application/use-cases/login/auth-output.dto';
import { LoginDto } from 'src/modules/auth/application/use-cases/login/login.dto';
import { LoginUseCase } from 'src/modules/auth/application/use-cases/login/login.usecase';
import { SignupDto } from 'src/modules/auth/application/use-cases/signup/signup.dto';
import { SignupUseCase } from 'src/modules/auth/application/use-cases/signup/signup.usecase';
import { MemoryCredentialRepository } from 'src/modules/auth/infra/repositories/MemoryCredentialRepository';
import { MemoryUserRepository } from 'src/modules/auth/infra/repositories/MemoryUserRepository';
import { MemoryExperienceRepository } from 'src/modules/experience/infra/repositories/MemoryExperienceRepository';
import { MemoryProfileRepository } from 'src/modules/profile/infra/repositories/MemoryProfileRepository';
import { MemoryTransactionService } from '../infra/repositories/MemoryAppRepository';
import { Experience } from 'src/modules/experience/entities/Experience.entity';
import { Id } from '../domain/value-objects/Id';
import { Name } from '../domain/value-objects/Name';
import { ExperienceDto } from 'src/modules/experience/entities/ExperienceDto';
import { MemoryEducationRepository } from 'src/modules/education/infra/repositories/MemoryEducationRepository';
import { Education } from 'src/modules/education/entities/Education.entity';
import { EducationDto } from 'src/modules/education/entities/EducationDto';
import { MemoryResumeRepository } from 'src/modules/resume/infra/repositories/MemoryResumeRepository';
import { Resume } from 'src/modules/resume/entities/Resume.entity';
import { ResumeDto } from 'src/modules/resume/entities/ResumeDto';

export class MemoryUseCaseTester {
  services: Map<unknown, unknown>;

  constructor() {
    this.services = new Map<unknown, unknown>();
  }

  private getOrCreate<T>(key: new (any) => T, fn?: () => T): T {
    if (this.services.has(key)) {
      return this.services.get(key) as T;
    } else {
      const value = fn ? fn() : new key(undefined);
      this.services.set(key, value);
      return value;
    }
  }

  get jwtService() {
    return this.getOrCreate(
      JwtService,
      () => new JwtService({ secret: 'test' }),
    );
  }

  get authTokenService() {
    return this.getOrCreate(
      AuthTokenService,
      () => new AuthTokenService(this.jwtService),
    );
  }

  get passwordService() {
    return this.getOrCreate(PasswordService);
  }

  get transactionService() {
    return this.getOrCreate(MemoryTransactionService);
  }

  get userRepository() {
    return this.getOrCreate(MemoryUserRepository);
  }
  get credentialRepository() {
    return this.getOrCreate(MemoryCredentialRepository);
  }
  get profileRepository() {
    return this.getOrCreate(MemoryProfileRepository);
  }
  get experienceRepository() {
    return this.getOrCreate(MemoryExperienceRepository);
  }
  get educationRepository() {
    return this.getOrCreate(MemoryEducationRepository);
  }
  get resumeRepository() {
    return this.getOrCreate(MemoryResumeRepository);
  }

  async signup(override?: Partial<SignupDto>): Promise<AuthOutputDto> {
    const signupDto: SignupDto = {
      name: faker.internet.displayName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...(override ?? {}),
    };

    const signup = new SignupUseCase(
      this.transactionService,
      this.userRepository,
      this.credentialRepository,
      this.profileRepository,
      this.passwordService,
      this.authTokenService,
    );

    return await signup.execute(signupDto);
  }

  async login(input: LoginDto) {
    const login = new LoginUseCase(
      this.transactionService,
      this.userRepository,
      this.credentialRepository,
      this.passwordService,
      this.authTokenService,
    );
    return await login.execute(input);
  }

  async createExperience(input: { userId: string }): Promise<ExperienceDto> {
    const experience = Experience.load({
      id: new Id(),
      title: new Name(faker.internet.domainWord()),
      company: new Name(faker.internet.displayName()),
      technologies: ['A', 'B', 'C'].map((e) => new Name(e)),
      description: faker.lorem.paragraph(),
      startDate: faker.date.past({ years: 3 }),
      endDate: faker.date.past({ years: 2 }),
      userId: new Id(input.userId),
    });
    await this.experienceRepository.add(experience);

    return ExperienceDto.createFrom(experience);
  }

  async createResume(input: { userId: string; experiences?: string[] }) {
    const resume = Resume.load({
      id: new Id(),
      userId: new Id(input.userId),
      title: new Name(faker.lorem.word()),
      description: faker.lorem.paragraph(),
      experiences: input.experiences
        ? input.experiences.map((e) => new Id(e))
        : [],
    });
    await this.resumeRepository.add(resume);
    return ResumeDto.createFrom(resume);
  }

  async createEducation(input: { userId: string }) {
    const education = Education.load({
      id: new Id(),
      userId: new Id(input.userId),
      title: new Name(faker.lorem.word()),
      institution: new Name(faker.lorem.word()),
      startDate: faker.date.past({ years: 7 }),
      endDate: faker.date.past({ years: 2 }),
    });
    await this.educationRepository.add(education);
    return EducationDto.createFrom(education);
  }
}