import type { Education } from "./types/Education";
import type { Experience } from "./types/Experience";
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
      updatedAt: new Date(),
    };
    return resume;
  }
  async getEducation(id: string) {
    const education: Education = {
      id: `1`,
      title: `Courst 1`,
      institution: `Institution 1`,
      userId: "123",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
    return education;
  }
  async getExperience(id: string) {
    const experience: Experience = {
      id: `1`,
      userId: "123",
      title: `title 1`,
      company: `company 1`,
      description: "lorem",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
    return experience;
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

  async getUserResumes(): Promise<Resume[]> {
    const resumes: Resume[] = [];

    for (let i = 1; i <= 4; i++) {
      resumes.push({
        id: `${i}`,
        title: `lorem${i}`,
        updatedAt: new Date(),
        userId: "123",
        description: "lorem",
        experiences: [],
      });
    }

    return resumes;
  }

  async getUserEducations(): Promise<Education[]> {
    const educations: Education[] = [];

    for (let i = 1; i <= 3; i++) {
      educations.push({
        id: `${i}`,
        title: `Courst ${i}`,
        institution: `Institution ${i}`,
        userId: "123",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });
    }

    return educations;
  }

  async getUserExperiences(): Promise<Experience[]> {
    const experiences: Experience[] = [];

    for (let i = 1; i <= 10; i++) {
      experiences.push({
        id: `${i}`,
        userId: "123",
        title: `title ${i}`,
        company: `company ${i}`,
        description: "lorem",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });
    }

    return experiences;
  }
}

export const backend = new Backend();
