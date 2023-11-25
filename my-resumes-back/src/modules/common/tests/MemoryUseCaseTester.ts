import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenService } from 'src/modules/auth/application/services/AuthTokenService';
import { AuthOutputDto } from 'src/modules/auth/application/use-cases/login/auth-output.dto';
import { SignupDto } from 'src/modules/auth/application/use-cases/signup/signup.dto';
import { SignupUseCase } from 'src/modules/auth/application/use-cases/signup/signup.usecase';
import { MemoryTransactionService } from '../infra/repositories/MemoryAppRepository';
import { MemoryUserRepository } from 'src/modules/auth/infra/repositories/MemoryUserRepository';
import { MemoryCredentialRepository } from 'src/modules/auth/infra/repositories/MemoryCredentialRepository';
import { MemoryProfileRepository } from 'src/modules/profile/infra/repositories/MemoryProfileRepository';
import { LoginUseCase } from 'src/modules/auth/application/use-cases/login/login.usecase';
import { LoginDto } from 'src/modules/auth/application/use-cases/login/login.dto';
import { PasswordService } from 'src/modules/auth/application/services/PasswordService';

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

  // async createExperience(
  //   override?: Partial<CreateExperienceDto>,
  // ): Promise<ExperienceDto> {
  //   const input: CreateExperienceDto = {
  //     title: faker.internet.domainWord(),
  //     company: faker.internet.displayName(),
  //     userId: this.auth.user.id,
  //     technologies: ['A', 'B', 'C'],
  //     description: faker.lorem.paragraph(),
  //     startDate: faker.date.past({ years: 3 }).toISOString(),
  //     endDate: faker.date.past({ years: 2 }).toISOString(),
  //     ...(override ?? {}),
  //   };
  //   const experienceUseCases = new ExperienceUseCases(this.prisma);
  //   return await experienceUseCases.createExperience(input);
  // }

  // async createResume(override?: Partial<CreateResumeDto>): Promise<ResumeDto> {
  //   const input: CreateResumeDto = {
  //     title: faker.internet.domainName(),
  //     userId: this.auth.user.id,
  //     description: faker.lorem.paragraph(),
  //     experiences: [],
  //     ...(override ?? {}),
  //   };
  //   const resumeUseCases = new ResumeUseCases(this.prisma);
  //   return await resumeUseCases.createResume(input);
  // }

  // async createEducation(
  //   override?: Partial<CreateEducationDto>,
  // ): Promise<EducationDto> {
  //   const input: CreateEducationDto = {
  //     title: faker.lorem.word(),
  //     institution: faker.lorem.word(),
  //     userId: this.auth.user.id,
  //     startDate: faker.date.past({ years: 7 }).toISOString(),
  //     endDate: faker.date.past({ years: 2 }).toISOString(),
  //     ...(override ?? {}),
  //   };
  //   const educationUseCases = new EducationUseCases(this.prisma);
  //   return await educationUseCases.createEducation(input);
  // }
}
