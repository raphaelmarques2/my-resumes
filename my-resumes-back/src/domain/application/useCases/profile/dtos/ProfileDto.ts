import { Profile } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const profileDtoSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    email: z.string(),
    address: z.string().optional(),
    linkedin: z.string().optional(),
  })
  .strict();

export class ProfileDto extends createZodDto(profileDtoSchema) {}

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
