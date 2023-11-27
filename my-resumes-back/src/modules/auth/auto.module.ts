import { Global, Module } from '@nestjs/common';
import { AuthController } from './infra/auth.controller';
import { AuthGuard } from './infra/guards/AuthGuard';
import { JwtModule } from '@nestjs/jwt';
import { configurations } from 'src/infra/services/MyConfigService';
import { PasswordService } from './application/services/PasswordService';
import { AuthTokenService } from './application/services/AuthTokenService';
import { UserRepository } from './application/repositories/UserRepository';
import { PrismaUserRepository } from './infra/repositories/PrismaUserRepository';
import { CredentialRepository } from './application/repositories/CredentialRepository';
import { PrismaCredentialRepository } from './infra/repositories/PrismaCredentialRepository';
import { LoginUseCase } from './application/use-cases/login/login.usecase';
import { SignupUseCase } from './application/use-cases/signup/signup.usecase';
import { UpdatePasswordUseCase } from './application/use-cases/update-password/update-password.usecase';
import { ValidateTokenUseCase } from './application/use-cases/validate-token/validate-token.usecase';
import { ProfileModule } from '../profile/profile.module';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: configurations().jwtSecret,
      //signOptions: { expiresIn: '60s' },
    }),
    ProfileModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: UserRepository, useClass: PrismaUserRepository },
    {
      provide: CredentialRepository,
      useClass: PrismaCredentialRepository,
    },
    ValidateTokenUseCase,
    AuthGuard,
    PasswordService,
    AuthTokenService,
    LoginUseCase,
    SignupUseCase,
    UpdatePasswordUseCase,
  ],
  exports: [AuthGuard, ValidateTokenUseCase, JwtModule, UserRepository],
})
export class AuthModule {}
