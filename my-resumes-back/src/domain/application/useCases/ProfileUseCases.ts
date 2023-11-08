import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileDto } from '../dtos/ProfileDto';
import { UpdateProfileDto } from '../dtos/UpdateProfileDto';
import { PrismaService } from 'src/domain/application/services/PrismaService';

@Injectable()
export class ProfileUseCases {
  constructor(private prisma: PrismaService) {}

  async update(id: string, input: UpdateProfileDto): Promise<ProfileDto> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException();
    }

    const updatedProfile = await this.prisma.profile.update({
      where: { id },
      data: {
        name: input.name,
        email: input.email,
        address: input.address,
        linkedin: input.linkedin,
      },
    });

    return ProfileDto.fromEntity(updatedProfile);
  }

  async findById(id: string): Promise<ProfileDto> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException();
    }

    return ProfileDto.fromEntity(profile);
  }

  async findByUserId(userId: string): Promise<ProfileDto> {
    const profile = await this.prisma.profile.findFirst({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException();
    }
    return ProfileDto.fromEntity(profile);
  }
}
