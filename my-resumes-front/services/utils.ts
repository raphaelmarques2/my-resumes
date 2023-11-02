import moment from "moment";
import { ExperienceDto } from "./backend/generated";

export function wait(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function getExperienceTime(experience: ExperienceDto) {
  const labels = [];
  if (experience.startDate) {
    labels.push(moment(experience.startDate).format("MMM YYYY"));
  }
  labels.push(
    experience.endDate ? moment(experience.endDate).format("MMM YYYY") : "Now"
  );
  return labels.join(" - ");
}
