import type { Resume } from "./types/Resume";

export class Backend {
  constructor() {}
  async updateResume(resume: Resume) {
    console.log("update-resume", resume);
  }
}

export const backend = new Backend();
