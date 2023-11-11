import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { AuthOutputDto } from 'src/domain/application/dtos/AuthOutputDto';
import { SignupDto } from 'src/domain/application/dtos/SignupDto';
import { AuthTokenService } from 'src/domain/application/services/AuthTokenService';
import { PasswordService } from 'src/domain/application/services/PasswordService';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { AuthUseCases } from 'src/domain/application/useCases/AuthUseCases';
import { cleanDatabase, createTempSchemaAndMigrate } from './db-test';

export class UseCaseTester {
  prisma!: PrismaService;

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
}

export function createUseCaseTester() {
  const tester = new UseCaseTester();
  beforeAll(async () => {
    tester.prisma = await createTempSchemaAndMigrate();
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
