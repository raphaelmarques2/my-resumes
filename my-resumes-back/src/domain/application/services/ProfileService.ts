import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../repositories/ProfileRepository';
import { Profile } from 'src/domain/core/entities/Profile';
import { Address } from 'src/domain/core/value-objects/Address';
import { Id } from 'src/domain/core/value-objects/Id';
import { Name } from 'src/domain/core/value-objects/Name';
import { Email } from 'src/domain/core/value-objects/Email';
import { Url } from 'src/domain/core/value-objects/Url';
import { CreateProfileDto } from '../dtos/CreateProfileDto';
import { ProfileDto } from '../dtos/ProfileDto';
import { UpdateProfileDto } from '../dtos/UpdateProfileDto';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async create(input: CreateProfileDto): Promise<ProfileDto> {
    const profile = Profile.createNew({
      userId: new Id(input.userId),
      name: new Name(input.name),
      email: new Email(input.email),
      address: input.address !== undefined ? new Address(input.address) : null,
      linkedin: input.linkedin !== undefined ? new Url(input.linkedin) : null,
    });
    await this.profileRepository.save(profile);
    const dto = ProfileDto.fromEntity(profile);
    return dto;
  }

  async update(id: string, input: UpdateProfileDto): Promise<ProfileDto> {
    const profile = await this.profileRepository.load(new Id(id));
    profile.update({
      name: input.name !== undefined ? new Name(input.name) : undefined,
      email: input.email !== undefined ? new Email(input.email) : undefined,
      address: Address.parseOrUndefined(input.address),
      linkedin: Url.parseOrUndefined(input.linkedin),
    });
    await this.profileRepository.save(profile);
    const dto = ProfileDto.fromEntity(profile);
    return dto;
  }

  async findById(id: string): Promise<ProfileDto> {
    const profile = await this.profileRepository.load(new Id(id));
    return ProfileDto.fromEntity(profile);
  }

  async findByUserId(userId: string): Promise<ProfileDto> {
    const profile = await this.profileRepository.getByUserId(new Id(userId));
    return ProfileDto.fromEntity(profile);
  }
}
