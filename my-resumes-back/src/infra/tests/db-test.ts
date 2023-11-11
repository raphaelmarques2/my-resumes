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

  // Connect to the database
  await prisma.$connect();

  // Generate a random schema name
  const tempSchema = 'temp_' + crypto.randomBytes(6).toString('hex');
  const tempSchemaUrl = `${dbUrl}?schema=${tempSchema}`;

  // Create a new temporary schema
  console.log(`creating schema: ${tempSchema}`);
  await prisma.$executeRawUnsafe(`CREATE SCHEMA ${tempSchema}`);

  // Disconnect from the database
  await prisma.$disconnect();

  // Run migrations on the new schema
  console.log(`Running migrations on ${tempSchemaUrl}`);
  execSync(`set DATABASE_URL=${tempSchemaUrl}&& npx prisma migrate deploy`);
  console.log('Running migrations done');

  const newPrismaClient: PrismaService = new PrismaClient({
    datasources: { db: { url: tempSchemaUrl } },
  });

  return newPrismaClient;
}
