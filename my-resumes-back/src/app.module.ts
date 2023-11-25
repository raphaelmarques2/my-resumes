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
import { PrismaService } from './modules/common/infra/PrismaService';
import {
  MyConfigService,
  configurations,
} from './infra/services/MyConfigService';
import { AuthTokenService } from './modules/auth/application/services/AuthTokenService';
import { PasswordService } from './modules/auth/application/services/PasswordService';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { EducationController } from './infra/controllers/education.controller';
import { EducationUseCases } from './domain/application/useCases/education/EducationUseCases';
import { LoginUseCase } from './modules/auth/application/use-cases/login/login.usecase';
import { SignupUseCase } from './modules/auth/application/use-cases/signup/signup.usecase';
import { UpdatePasswordUseCase } from './modules/auth/application/use-cases/update-password/update-password.usecase';
import { ValidateTokenUseCase } from './modules/auth/application/use-cases/validate-token/validate-token.usecase';
import { PrismaTransactionService } from './modules/common/infra/repositories/PrismaAppRepository';
import { PrismaUserRepository } from './modules/auth/infra/repositories/PrismaUserRepository';
import { PrismaCredentialRepository } from './modules/auth/infra/repositories/PrismaCredentialRepository';
import { PrismaProfileRepository } from './modules/profile/infra/repositories/PrismaProfileRepository';
import { TransactionService } from './modules/common/application/repositories/TransactionService';
import { CredentialRepository } from './modules/auth/application/repositories/CredentialRepository';
import { UserRepository } from './modules/auth/application/repositories/UserRepository';
import { ProfileRepository } from './modules/profile/domain/application/repositories/ProfileRepository';

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
    EducationUseCases,
    //new repositories
    { provide: TransactionService, useClass: PrismaTransactionService },
    { provide: UserRepository, useClass: PrismaUserRepository },
    {
      provide: CredentialRepository,
      useClass: PrismaCredentialRepository,
    },
    { provide: ProfileRepository, useClass: PrismaProfileRepository },
    //new usecases
    LoginUseCase,
    SignupUseCase,
    UpdatePasswordUseCase,
    ValidateTokenUseCase,
  ],
})
export class AppModule {}
