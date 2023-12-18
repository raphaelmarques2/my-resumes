import moment from "moment";

export type Education = {
  id: string;
  userId: string;
  title: string;
  institution: string;
  startDate?: string;
  endDate?: string;
};

export function formatEducation(education: Education): string {
  return [
    education.title,
    education.institution,
    education.endDate ? moment(education.endDate).format("MMM YYYY") : "Now",
  ]
    .filter(Boolean)
    .join(" - ");
}
