import { PrismaService } from 'src/modules/common/infra/services/PrismaService';
import { cleanDatabase } from './db-test';
import { Server } from 'http';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AuthOutputDto } from 'src/modules/auth/application/use-cases/login/auth-output.dto';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

export class AppTester {
  prisma!: PrismaService;
  server!: Server;

  async signup(): Promise<AuthOutputDto> {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    };
    const signupRes = await request(this.server)
      .post('/auth/signup')
      .send(payload);
    expect(signupRes.status).toBe(HttpStatus.CREATED);

    return signupRes.body;
  }
}

export function createAppTester() {
  const tester = new AppTester();

  beforeAll(async () => {
    if (!process.env.TEST_DATABASE_URL)
      throw new Error('No process.env.TEST_DATABASE_URL');

    tester.prisma = new PrismaService({ url: process.env.TEST_DATABASE_URL });
    await tester.prisma.$connect();

    const moduleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });
    moduleBuilder.overrideProvider(PrismaService).useValue(tester.prisma);

    const testingModule = await moduleBuilder.compile();

    const app = testingModule.createNestApplication();
    await app.init();

    tester.server = app.getHttpServer();
  });

  beforeEach(async () => {
    await cleanDatabase(tester.prisma);
  });

  afterAll(async () => {
    await cleanDatabase(tester.prisma);
    await tester.prisma.$disconnect();
  });

  return tester;
}
