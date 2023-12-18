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
