import moment from "moment";

export type Experience = {
  id: string;
  userId: string;
  title: string;
  company: string;
  description: string;
  startDate?: string;
  endDate?: string;
};

export function formatExperience(experience: Experience): string {
  return [
    experience.company,
    experience.startDate ? moment(experience.startDate).format("MMM YYYY") : "",
    experience.endDate ? moment(experience.endDate).format("MMM YYYY") : "Now",
  ]
    .filter(Boolean)
    .join(" - ");
}

export function sortExperiencesByNewestFirst(experiences: Experience[]) {
  return experiences.sort((a, b) => {
    const aEndDate = a.endDate ? new Date(a.endDate) : new Date();
    const bEndDate = b.endDate ? new Date(b.endDate) : new Date();
    return bEndDate.getTime() - aEndDate.getTime();
  });
}
