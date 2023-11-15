import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileDto, convertToProfileDto } from './dtos/ProfileDto';
import {
  UpdateProfileDto,
  updateProfileDtoSchema,
} from './dtos/UpdateProfileDto';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { validateDto, validateId } from '../../services/validation';

@Injectable()
export class ProfileUseCases {
  constructor(private prisma: PrismaService) {}

  async updateProfile(
    id: string,
    input: UpdateProfileDto,
  ): Promise<ProfileDto> {
    validateId(id);
    validateDto(input, updateProfileDtoSchema);

    const updatedProfile = await this.prisma.$transaction(async (prisma) => {
      const profile = await prisma.profile.findUnique({
        where: { id },
      });
      if (!profile) {
        throw new NotFoundException();
      }

      const updatedProfile = await prisma.profile.update({
        where: { id },
        data: {
          name: input.name,
          email: input.email,
          address: input.address,
          linkedin: input.linkedin,
        },
      });

      return updatedProfile;
    });

    return convertToProfileDto(updatedProfile);
  }

  async getProfileById(id: string): Promise<ProfileDto> {
    validateId(id);

    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException();
    }

    return convertToProfileDto(profile);
  }

  async getUserProfile(userId: string): Promise<ProfileDto> {
    validateId(userId);

    const profile = await this.prisma.profile.findFirst({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException();
    }
    return convertToProfileDto(profile);
  }
}
