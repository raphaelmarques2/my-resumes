import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configurations } from 'src/infra/services/MyConfigService';
import { ProfileModule } from '../profile/profile.module';
import { CredentialRepository } from './application/repositories/CredentialRepository';
import { UserRepository } from './application/repositories/UserRepository';
import { AuthTokenService } from './application/services/AuthTokenService';
import { PasswordService } from './application/services/PasswordService';
import { LoginUseCase } from './application/use-cases/login/login.usecase';
import { RequestPasswordResetUseCase } from './application/use-cases/request-password-reset/request-password-reset.usecase';
import { SignupUseCase } from './application/use-cases/signup/signup.usecase';
import { UpdatePasswordByResetTokenUseCase } from './application/use-cases/update-password-by-reset-token/update-password-by-reset-token.usecase';
import { UpdatePasswordUseCase } from './application/use-cases/update-password/update-password.usecase';
import { ValidatePasswordResetTokenUseCase } from './application/use-cases/validate-password-reset-token/validate-password-reset-token.usecase';
import { ValidateTokenUseCase } from './application/use-cases/validate-token/validate-token.usecase';
import { AuthController } from './infra/controllers/auth.controller';
import { AuthGuard } from './infra/guards/AuthGuard';
import { PrismaCredentialRepository } from './infra/repositories/PrismaCredentialRepository';
import { PrismaUserRepository } from './infra/repositories/PrismaUserRepository';
import { UpdatePasswordRequestController } from './infra/controllers/update-password-request.controller';
import { ResetPasswordRequestRepository } from './application/repositories/ResetPasswordRequestRepository';
import { PrismaResetPasswordRequestRepository } from './infra/repositories/PrismaResetPasswordRequestRepository';

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
  controllers: [AuthController, UpdatePasswordRequestController],
  providers: [
    { provide: UserRepository, useClass: PrismaUserRepository },
    {
      provide: CredentialRepository,
      useClass: PrismaCredentialRepository,
    },
    {
      provide: ResetPasswordRequestRepository,
      useClass: PrismaResetPasswordRequestRepository,
    },
    ValidateTokenUseCase,
    AuthGuard,
    PasswordService,
    AuthTokenService,
    LoginUseCase,
    SignupUseCase,
    UpdatePasswordUseCase,
    RequestPasswordResetUseCase,
    ValidatePasswordResetTokenUseCase,
    UpdatePasswordByResetTokenUseCase,
  ],
  exports: [AuthGuard, ValidateTokenUseCase, JwtModule, UserRepository],
})
export class AuthModule {}
