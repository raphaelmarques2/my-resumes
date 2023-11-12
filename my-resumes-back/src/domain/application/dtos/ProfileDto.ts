import { Profile } from '@prisma/client';

export type ProfileDto = {
  id: string;
  userId: string;
  name: string;
  email: string;
  address?: string;
  linkedin?: string;
};

export function convertToProfileDto(profile: Profile): ProfileDto {
  return {
    id: profile.id,
    userId: profile.userId,
    name: profile.name,
    email: profile.email,
    address: profile.address ?? undefined,
    linkedin: profile.linkedin ?? undefined,
  };
}
