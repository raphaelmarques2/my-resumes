import { BadRequestException, Injectable } from '@nestjs/common';
import { validateDto } from 'src/modules/common/application/validation';
import {
  UpdatePasswordDto,
  updatePasswordDtoSchema,
} from 'src/modules/auth/application/use-cases/update-password/update-password.dto';
import { Credential } from 'src/modules/auth/domain/entities/Credential.entity';
import { Id } from 'src/modules/common/domain/value-objects/Id';
import { UserRepository } from '../../repositories/UserRepository';
import { CredentialRepository } from '../../repositories/CredentialRepository';
import { PasswordService } from '../../services/PasswordService';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private credentialRepository: CredentialRepository,
    private passwordService: PasswordService,
  ) {}

  async execute(input: UpdatePasswordDto): Promise<void> {
    validateDto(input, updatePasswordDtoSchema);

    const user = await this.userRepository.findById(new Id(input.userId));
    if (!user) throw new BadRequestException('User not found');

    const passwordHash = await this.passwordService.hashPassword(
      input.password,
    );

    const credential = await this.credentialRepository.findByUserId(user.id);

    if (credential) {
      credential.password = passwordHash;
      await this.credentialRepository.update(credential);
    } else {
      const newCredential = Credential.create({
        id: new Id(),
        userId: user.id,
        password: passwordHash,
      });
      await this.credentialRepository.add(newCredential);
    }
  }
}
