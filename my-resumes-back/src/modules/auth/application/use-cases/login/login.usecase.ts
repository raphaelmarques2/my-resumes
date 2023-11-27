import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Credential } from 'src/modules/auth/application/entities/Credential.entity';
import { UserDto } from 'src/modules/auth/application/entities/User.dto';
import { User } from 'src/modules/auth/application/entities/User.entity';
import { AuthTokenService } from 'src/modules/auth/application/services/AuthTokenService';
import { TransactionService } from 'src/modules/common/application/repositories/TransactionService';
import { validateDto } from 'src/modules/common/application/validation';
import { Email } from 'src/modules/common/application/value-objects/Email';
import { CredentialRepository } from '../../repositories/CredentialRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { PasswordService } from '../../services/PasswordService';
import { AuthOutputDto } from './auth-output.dto';
import { LoginDto, loginDtoSchema } from './login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private transactionService: TransactionService,
    private userRepository: UserRepository,
    private credentialRepository: CredentialRepository,
    private passwordService: PasswordService,
    private authTokenService: AuthTokenService,
  ) {}

  async execute(input: LoginDto): Promise<AuthOutputDto> {
    validateDto(input, loginDtoSchema);

    const user = await this.userRepository.findByEmail(new Email(input.email));

    if (!user) {
      throw new UnauthorizedException();
    }

    const credential = await this.getOrCreateUserCredential(input, user);

    const isPasswordValid = await this.passwordService.comparePasswords(
      input.password,
      credential.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const token = await this.authTokenService.generateToken({
      userId: user.id.value,
      email: user.email.value,
    });
    return {
      token,
      user: UserDto.createFrom(user),
    };
  }

  private async getOrCreateUserCredential(input: LoginDto, user: User) {
    const credential = await this.transactionService.transaction(
      async (transaction) => {
        const credential = await this.credentialRepository.findByUserId(
          user.id,
          { transaction },
        );

        if (credential) return credential;

        //create credential if it does not exist
        const passwordHash = await this.passwordService.hashPassword(
          input.password,
        );

        const newCredential = Credential.create({
          userId: user.id,
          password: passwordHash,
        });

        await this.credentialRepository.add(newCredential, { transaction });

        return newCredential;
      },
    );
    return credential;
  }
}
