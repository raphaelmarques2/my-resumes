import { Experience } from '@prisma/client';

export type ExperienceDto = {
  id: string;
  userId: string;
  title: string;
  company: string;
  description: string;
  startDate?: string;
  endDate?: string;
  technologies: string[];
};

export function convertToExperienceDto(experience: Experience): ExperienceDto {
  return {
    id: experience.id,
    userId: experience.userId,
    title: experience.title,
    company: experience.company,
    description: experience.description,
    startDate: experience.startDate?.toISOString(),
    endDate: experience.endDate?.toISOString(),
    technologies: experience.technologies,
  };
}
