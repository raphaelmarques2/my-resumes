import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import * as crypto from 'crypto';

export async function cleanDatabase(prisma: PrismaClient) {
  await prisma.experienceToResume.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.userCredential.deleteMany();
  await prisma.user.deleteMany();
}

export async function createTempSchemaAndMigrate() {
  const dbUrl = process.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasources: { db: { url: dbUrl } },
  });

  await prisma.$connect();

  const tempSchema = 'temp_' + crypto.randomBytes(6).toString('hex');
  const tempSchemaUrl = `${dbUrl}?schema=${tempSchema}`;

  //console.log(`creating schema: ${tempSchema}`);
  await prisma.$executeRawUnsafe(`CREATE SCHEMA ${tempSchema}`);

  await prisma.$disconnect();

  console.log(`Running migrations on ${tempSchemaUrl}`);
  execSync(
    `npx cross-env DATABASE_URL=${tempSchemaUrl} npx prisma migrate deploy`,
  );
  //console.log('Running migrations done');

  const newPrismaClient: PrismaService = new PrismaClient({
    datasources: { db: { url: tempSchemaUrl } },
  });

  return { prisma: newPrismaClient, tempSchema };
}

export async function deleteTempSchema(schemaName: string) {
  const dbUrl = process.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasources: { db: { url: dbUrl } },
  });

  await prisma.$connect();

  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);

  await prisma.$disconnect();
}
