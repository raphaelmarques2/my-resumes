import type { Profile } from "./types/Profile";
import type { Resume } from "./types/Resume";

export class Backend {
  constructor() {}
  async updateResume(resume: Resume) {
    console.log("update-resume", resume);
  }
  async updateProfile(profile: Profile) {
    console.log("update-profile", profile);
  }

  async getResume(id: string) {
    const resume: Resume = {
      id: id,
      userId: "userid",
      title: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus numquam corrupti sunt consequuntur a quaerat voluptates, quasi perspiciatis deserunt aliquid labore nulla cumque minus. Inventore, error. Sunt veritatis minima quibusdam?",
      experiences: ["1", "2", "3", "4"],
    };
    return resume;
  }

  async getUserProfile() {
    const profile: Profile = {
      id: "123",
      userId: "userid",
      name: "John",
      email: "john@test.com",
      address: "City X",
      linkedin: "https://linkedin.com",
    };
    return profile;
  }
}

export const backend = new Backend();
