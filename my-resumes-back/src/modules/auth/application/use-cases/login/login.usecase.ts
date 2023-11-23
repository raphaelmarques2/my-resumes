import { Injectable, UnauthorizedException } from '@nestjs/common';
import { validateDto } from 'src/domain/application/services/validation';
import { AuthOutputDto } from './auth-output.dto';
import { LoginDto, loginDtoSchema } from './login.dto';
import { PasswordService } from 'src/domain/application/services/PasswordService';
import { Credential } from 'src/modules/auth/domain/entities/Credential.entity';
import { Id } from 'src/modules/common/domain/value-objects/Id';
import { AuthTokenService } from 'src/domain/application/services/AuthTokenService';
import { UserDto } from 'src/modules/auth/domain/entities/User.dto';
import { User } from 'src/modules/auth/domain/entities/User.entity';
import { Email } from 'src/modules/common/domain/value-objects/Email';
import { TransactionService } from 'src/modules/common/application/repositories/TransactionService';
import { UserRepository } from '../../repositories/UserRepository';
import { CredentialRepository } from '../../repositories/CredentialRepository';

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
          id: new Id(),
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
