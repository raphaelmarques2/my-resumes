import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { ResumeUseCases } from './domain/application/useCases/ResumeUseCases';
import { ExperienceUseCases } from './domain/application/useCases/ExperienceUseCases';
import { ProfileUseCases } from './domain/application/useCases/ProfileUseCases';
import { UserUseCases } from './domain/application/useCases/UserUseCases';
import { AuthController } from './infra/controllers/auth.controller';
import { ResumeController } from './infra/controllers/resume.controller';
import { ExperienceController } from './infra/controllers/experience.controller';
import { ProfileController } from './infra/controllers/profile.controller';
import { LoggerMiddleware } from './infra/middlewares/LoggerMiddleware';
import { LoggingInterceptor } from './infra/middlewares/LoggingInterceptor';
import { AuthUseCases } from './domain/application/useCases/AuthUseCases';
import { PrismaService } from './domain/application/services/PrismaService';
import {
  MyConfigService,
  configurations,
} from './infra/services/MyConfigService';
import { AuthTokenService } from './domain/application/services/AuthTokenService';
import { PasswordService } from './domain/application/services/PasswordService';

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
  ],
  providers: [
    MyConfigService,
    LoggerMiddleware,
    LoggingInterceptor,
    PrismaService,
    ResumeUseCases,
    ExperienceUseCases,
    ProfileUseCases,
    UserUseCases,
    PasswordService,
    AuthTokenService,
    AuthUseCases,
  ],
})
export class AppModule {}
