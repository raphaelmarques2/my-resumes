import { Resume } from '@prisma/client';

export type ResumeDto = {
  id: string;
  userId: string;
  title: string;
  description: string;
  experiences: string[];
};

export function convertToResumeDto(
  resume: Resume & { experienceToResumes: { experienceId: string }[] },
): ResumeDto {
  return {
    id: resume.id,
    userId: resume.userId,
    title: resume.title,
    description: resume.description,
    experiences: resume.experienceToResumes.map((item) => item.experienceId),
  };
}
