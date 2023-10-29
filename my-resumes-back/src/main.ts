import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { execSync } from 'child_process';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './infra/middlewares/LoggingInterceptor';
import { PopulateService } from './infra/services/PopulateService';
import { ConfigData } from './infra/services/MyConfigService';

async function bootstrap() {
  await runMigrations();

  const app = await NestFactory.create(AppModule, {});
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const swaggerConfig = new DocumentBuilder().setTitle('My CV API').build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const configService = app.get<ConfigService<ConfigData>>(ConfigService);
  const port = configService.get('port');

  if (configService.get('populateDb')) {
    const populateService = app.get<PopulateService>(PopulateService);
    await populateService.populate();
  }

  await app.listen(port).then(() => {
    console.log(`Running on http://localhost:${port}`);
  });

  return { app };
}

async function runMigrations() {
  if (process.env.IN_MEMORY_DB) return;
  console.log('Running migrations');
  const url = process.env.DATABASE_URL;
  execSync(`set DATABASE_URL=${url} && npx prisma migrate deploy`);
}

module.exports = new Promise(async (resolve) => {
  const { app } = await bootstrap();
  resolve(app);
});
