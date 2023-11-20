import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { ResumeUseCases } from './domain/application/useCases/resume/ResumeUseCases';
import { ExperienceUseCases } from './domain/application/useCases/experience/ExperienceUseCases';
import { ProfileUseCases } from './domain/application/useCases/profile/ProfileUseCases';
import { AuthController } from './infra/controllers/auth.controller';
import { ResumeController } from './infra/controllers/resume.controller';
import { ExperienceController } from './infra/controllers/experience.controller';
import { ProfileController } from './infra/controllers/profile.controller';
import { LoggerMiddleware } from './infra/middlewares/LoggerMiddleware';
import { LoggingInterceptor } from './infra/middlewares/LoggingInterceptor';
import { AuthUseCases } from './domain/application/useCases/auth/AuthUseCases';
import { PrismaService } from './domain/application/services/PrismaService';
import {
  MyConfigService,
  configurations,
} from './infra/services/MyConfigService';
import { AuthTokenService } from './domain/application/services/AuthTokenService';
import { PasswordService } from './domain/application/services/PasswordService';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { EducationController } from './infra/controllers/education.controller';
import { EducationUseCases } from './domain/application/useCases/education/EducationUseCases';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
    JwtModule.register({
      global: true,
      secret: configurations().jwtSecret,
      //signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    AppController,
    ExperienceController,
    ResumeController,
    ProfileController,
    AuthController,
    EducationController,
  ],
  providers: [
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    MyConfigService,
    LoggerMiddleware,
    LoggingInterceptor,
    PrismaService,
    ResumeUseCases,
    ExperienceUseCases,
    ProfileUseCases,
    PasswordService,
    AuthTokenService,
    AuthUseCases,
    EducationUseCases,
  ],
})
export class AppModule {}
