export type Resume = {
  id: string;
  name: string;
  userId: string;
  title: string;
  description: string;
  experiences: string[];
  educations: string[];
  updatedAt: string;
};

export function sortResumesByRecentlyUpdatedFirst(resumes: Resume[]) {
  return resumes.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}
