import { PrismaService } from 'src/domain/application/services/PrismaService';
import { cleanDatabase, createTempSchemaAndMigrate } from './db-test';

export class UseCaseTester {
  prisma!: PrismaService;
}

export function createUseCaseTester() {
  const tester = new UseCaseTester();
  beforeAll(async () => {
    tester.prisma = await createTempSchemaAndMigrate();
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
