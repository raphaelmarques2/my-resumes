import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeRepository } from './domain/application/repositories/ResumeRepository';
import { ExperienceRepository } from './domain/application/repositories/ExperienceRepository';
import { ProfileRepository } from './domain/application/repositories/ProfileRepository';
import { UserRepository } from './domain/application/repositories/UserRepository';
import { ResumeService } from './domain/application/services/ResumeService';
import { ExperienceService } from './domain/application/services/ExperienceService';
import { ProfileService } from './domain/application/services/ProfileService';
import { UserService } from './domain/application/services/UserService';
import { AuthController } from './infra/controllers/auth.controller';
import { ResumeController } from './infra/controllers/resume.controller';
import { ExperienceController } from './infra/controllers/experience.controller';
import { ProfileController } from './infra/controllers/profile.controller';
import { LoggerMiddleware } from './infra/middlewares/LoggerMiddleware';
import { LoggingInterceptor } from './infra/middlewares/LoggingInterceptor';
import { MemoryResumeRepository } from './infra/repositories/memory/MemoryResumeRepository';
import { MemoryExperienceRepository } from './infra/repositories/memory/MemoryExperienceRepository';
import { MemoryProfileRepository } from './infra/repositories/memory/MemoryProfileRepository';
import { MemoryUserRepository } from './infra/repositories/memory/MemoryUserRepository';
import { AuthService } from './infra/services/AuthService';
import { PopulateService } from './infra/services/PopulateService';
import { DbResumeRepository } from './infra/repositories/postgres/DbResumeRepository';
import { DbExperienceRepository } from './infra/repositories/postgres/DbExperienceRepository';
import { PrismaService } from './infra/repositories/PrismaService';
import { DbProfileRepository } from './infra/repositories/postgres/DbProfileRepository';
import { DbUserRepository } from './infra/repositories/postgres/DbUserRepository';
import {
  MyConfigService,
  configurations,
} from './infra/services/MyConfigService';

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
    ...getRepositoryProviders(),
    ResumeService,
    ExperienceService,
    ProfileService,
    UserService,
    PopulateService,
    AuthService,
    AppService,
  ],
})
export class AppModule {}

function getRepositoryProviders() {
  const useMemoryDb = Boolean(process.env.IN_MEMORY_DB);
  if (useMemoryDb) {
    return [
      { provide: ResumeRepository, useClass: MemoryResumeRepository },
      { provide: ExperienceRepository, useClass: MemoryExperienceRepository },
      { provide: ProfileRepository, useClass: MemoryProfileRepository },
      { provide: UserRepository, useClass: MemoryUserRepository },
    ];
  } else {
    return [
      PrismaService,
      { provide: ResumeRepository, useClass: DbResumeRepository },
      { provide: ExperienceRepository, useClass: DbExperienceRepository },
      { provide: ProfileRepository, useClass: DbProfileRepository },
      { provide: UserRepository, useClass: DbUserRepository },
    ];
  }
}
