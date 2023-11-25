import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { AuthTokenService } from 'src/modules/auth/application/services/AuthTokenService';
import { PrismaService } from 'src/modules/common/infra/PrismaService';
import { ExperienceUseCases } from 'src/modules/experience/old/ExperienceUseCases';
import { CreateExperienceDto } from 'src/modules/experience/use-cases/create-experience/CreateExperienceDto';
import { ExperienceDto } from 'src/modules/experience/entities/ExperienceDto';
import { ResumeUseCases } from 'src/domain/application/useCases/resume/ResumeUseCases';
import { CreateResumeDto } from 'src/domain/application/useCases/resume/dtos/CreateResumeDto';
import { ResumeDto } from 'src/domain/application/useCases/resume/dtos/ResumeDto';
import { cleanDatabase } from './db-test';
import { CreateEducationDto } from 'src/domain/application/useCases/education/dtos/CreateEducationDto';
import { EducationDto } from 'src/domain/application/useCases/education/dtos/EducationDto';
import { EducationUseCases } from 'src/domain/application/useCases/education/EducationUseCases';
import { AuthOutputDto } from 'src/modules/auth/application/use-cases/login/auth-output.dto';
import { PasswordService } from 'src/modules/auth/application/services/PasswordService';

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

  async createUser(): Promise<AuthOutputDto> {
    return undefined as any as AuthOutputDto;
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

  async createEducation(
    override?: Partial<CreateEducationDto>,
  ): Promise<EducationDto> {
    const input: CreateEducationDto = {
      title: faker.lorem.word(),
      institution: faker.lorem.word(),
      userId: this.auth.user.id,
      startDate: faker.date.past({ years: 7 }).toISOString(),
      endDate: faker.date.past({ years: 2 }).toISOString(),
      ...(override ?? {}),
    };
    const educationUseCases = new EducationUseCases(this.prisma);
    return await educationUseCases.createEducation(input);
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
    }) as PrismaService);
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
