import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { AuthTokenService } from 'src/domain/application/services/AuthTokenService';
import { PasswordService } from 'src/domain/application/services/PasswordService';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { AuthUseCases } from 'src/domain/application/useCases/auth/AuthUseCases';
import { AuthOutputDto } from 'src/domain/application/useCases/auth/dtos/AuthOutputDto';
import { SignupDto } from 'src/domain/application/useCases/auth/dtos/SignupDto';
import { ExperienceUseCases } from 'src/domain/application/useCases/experience/ExperienceUseCases';
import { CreateExperienceDto } from 'src/domain/application/useCases/experience/dtos/CreateExperienceDto';
import { ExperienceDto } from 'src/domain/application/useCases/experience/dtos/ExperienceDto';
import { ResumeUseCases } from 'src/domain/application/useCases/resume/ResumeUseCases';
import { CreateResumeDto } from 'src/domain/application/useCases/resume/dtos/CreateResumeDto';
import { ResumeDto } from 'src/domain/application/useCases/resume/dtos/ResumeDto';
import { cleanDatabase } from './db-test';

export class UseCaseTester {
  prisma!: PrismaService;
  tempDdSchema!: string;

  auth!: AuthOutputDto;

  private _jwtService?: JwtService;
  get jwtService(): JwtService {
    if (!this._jwtService) {
      this._jwtService = new JwtService({ secret: 'test' });
    }
    return this._jwtService;
  }

  private _authTokenService?: AuthTokenService;
  get authTokenService(): AuthTokenService {
    if (!this._authTokenService) {
      this._authTokenService = new AuthTokenService(this.jwtService);
    }
    return this._authTokenService;
  }

  private _passwordService?: PasswordService;
  get passwordService(): PasswordService {
    if (!this._passwordService) {
      this._passwordService = new PasswordService();
    }
    return this._passwordService;
  }

  private _authUseCases?: AuthUseCases;
  get authUseCases(): AuthUseCases {
    if (!this._authUseCases) {
      this._authUseCases = new AuthUseCases(
        this.authTokenService,
        this.passwordService,
        this.prisma,
      );
    }
    return this._authUseCases;
  }

  async createUser(): Promise<AuthOutputDto> {
    const signupDto: SignupDto = {
      name: faker.internet.displayName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    return await this.authUseCases.signup(signupDto);
  }

  async createExperience(
    override?: Partial<CreateExperienceDto>,
  ): Promise<ExperienceDto> {
    const input: CreateExperienceDto = {
      title: faker.internet.domainWord(),
      company: faker.internet.displayName(),
      userId: this.auth.user.id,
      technologies: ['A', 'B', 'C'],
      description: faker.lorem.paragraph(),
      startDate: faker.date.past({ years: 3 }).toISOString(),
      endDate: faker.date.past({ years: 2 }).toISOString(),
      ...(override ?? {}),
    };
    const experienceUseCases = new ExperienceUseCases(this.prisma);
    return await experienceUseCases.createExperience(input);
  }

  async createResume(override?: Partial<CreateResumeDto>): Promise<ResumeDto> {
    const input: CreateResumeDto = {
      title: faker.internet.domainName(),
      userId: this.auth.user.id,
      description: faker.lorem.paragraph(),
      experiences: [],
      ...(override ?? {}),
    };
    const resumeUseCases = new ResumeUseCases(this.prisma);
    return await resumeUseCases.createResume(input);
  }
}

export function createUseCaseTester() {
  const tester = new UseCaseTester();
  beforeAll(async () => {
    if (!process.env.JEST_DATABASE_URL)
      throw new Error('No process.env.JEST_DATABASE_URL');
    if (!process.env.JEST_DATABASE_SCHEMA)
      throw new Error('No process.env.JEST_DATABASE_SCHEMA');

    const prisma = (tester.prisma = new PrismaClient({
      datasources: { db: { url: process.env.JEST_DATABASE_URL } },
    }));
    tester.tempDdSchema = process.env.JEST_DATABASE_SCHEMA;
    await prisma.$connect();
  });
  beforeEach(async () => {
    await cleanDatabase(tester.prisma);
    tester.auth = await tester.createUser();
  });

  afterAll(async () => {
    await cleanDatabase(tester.prisma);
    await tester.prisma.$disconnect();
  });

  return tester;
}
