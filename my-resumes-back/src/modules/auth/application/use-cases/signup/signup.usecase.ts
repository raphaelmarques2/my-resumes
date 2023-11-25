import { BadRequestException, Injectable } from '@nestjs/common';
import { validateDto } from 'src/modules/common/application/validation';
import {
  SignupDto,
  signupDtoSchema,
} from 'src/modules/auth/application/use-cases/signup/signup.dto';
import { AuthOutputDto } from '../login/auth-output.dto';
import { AuthTokenService } from 'src/modules/auth/application/services/AuthTokenService';
import { Credential } from 'src/modules/auth/domain/entities/Credential.entity';
import { UserDto } from 'src/modules/auth/domain/entities/User.dto';
import { User } from 'src/modules/auth/domain/entities/User.entity';
import { TransactionService } from 'src/modules/common/application/repositories/TransactionService';
import { Email } from 'src/modules/common/domain/value-objects/Email';
import { Id } from 'src/modules/common/domain/value-objects/Id';
import { Name } from 'src/modules/common/domain/value-objects/Name';
import { ProfileRepository } from 'src/modules/profile/domain/application/repositories/ProfileRepository';
import { Profile } from 'src/modules/profile/domain/entities/Profile.entity';
import { CredentialRepository } from '../../repositories/CredentialRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { PasswordService } from '../../services/PasswordService';

@Injectable()
export class SignupUseCase {
  constructor(
    private transactionService: TransactionService,
    private userRepository: UserRepository,
    private credentialRepository: CredentialRepository,
    private profileRepository: ProfileRepository,
    private passwordService: PasswordService,
    private authTokenService: AuthTokenService,
  ) {}

  async execute(input: SignupDto): Promise<AuthOutputDto> {
    validateDto(input, signupDtoSchema);

    const user = await this.transactionService.transaction(
      async (transaction) => {
        const userFound = await this.userRepository.findByEmail(
          new Email(input.email),
          { transaction },
        );
        if (userFound) {
          throw new BadRequestException('Email already in use');
        }

        const passwordHash = await this.passwordService.hashPassword(
          input.password,
        );

        const user = User.create({
          id: new Id(),
          name: new Name(input.name),
          email: new Email(input.email),
        });
        const credential = Credential.create({
          id: new Id(),
          userId: user.id,
          password: passwordHash,
        });

        const profile = Profile.create({
          id: new Id(),
          userId: user.id,
          name: user.name.value,
          email: user.email.value,
        });

        await this.userRepository.add(user, { transaction });
        await this.credentialRepository.add(credential, { transaction });
        await this.profileRepository.add(profile, { transaction });

        return user;
      },
    );

    const token = await this.authTokenService.generateToken({
      userId: user.id.value,
      email: user.email.value,
    });
    return {
      token,
      user: UserDto.createFrom(user),
    };
  }
}
