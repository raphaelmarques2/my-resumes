import axios, { Axios, AxiosError } from "axios";
import type { Education } from "./types/Education";
import type { Experience } from "./types/Experience";
import type { Profile } from "./types/Profile";
import type { Resume } from "./types/Resume";
import type { User } from "./types/User";

interface LoginPayload {
  email: string;
  password: string;
}
interface SignupPayload {
  name: string;
  email: string;
  password: string;
}
interface AuthResult {
  token: string;
  user?: User;
}
interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export class Backend {
  baseUrl: string;
  token?: string;

  constructor(token?: string | null) {
    this.baseUrl = "http://localhost:3001";
    this.token = token || undefined;
  }

  async login(payload: LoginPayload): Promise<AuthResult> {
    const result = await this.request<AuthResult>(
      "POST",
      "/auth/login",
      payload
    );
    return result;
  }
  async signup(payload: SignupPayload): Promise<AuthResult> {
    const result = await this.request<AuthResult>(
      "POST",
      "/auth/signup",
      payload
    );
    return result;
  }
  async validateToken(token: string): Promise<boolean> {
    const result = await this.request<AuthResult>(
      "POST",
      "/auth/validate-token"
    );
    return Boolean(result.token);
  }
  async requestPasswordReset(email: string): Promise<void> {
    console.log(
      `BE${this.token ? "[Auth]" : ""}` + "request-password-reset",
      email
    );
  }
  async updatePassword(payload: UpdatePasswordPayload): Promise<void> {
    await this.request<void>("POST", "/auth/update-password", payload);
  }
  async getUser(): Promise<User> {
    const result = await this.request<User>("GET", "/auth/me");
    return result;
  }

  async listUserResumes(): Promise<Resume[]> {
    const result = await this.request<Resume[]>("GET", "/resumes");
    return result;
  }
  async getResume(id: string) {
    const result = await this.request<Resume>("GET", `/resumes/${id}`);
    return result;
  }
  async updateResume(resume: Resume) {
    const result = await this.request<Resume>(
      "PATCH",
      `/resumes/${resume.id}`,
      {
        name: resume.name,
        title: resume.title,
        description: resume.description,
        experiences: resume.experiences,
        educations: resume.educations,
      }
    );
  }
  async addResume() {
    const result = await this.request<Resume>("POST", `/resumes`);
    return result;
  }
  async addResumeExample() {
    await this.request<void>("POST", `/resumes/example`);
  }

  async deleteResume(id: string) {
    await this.request<Resume>("DELETE", `/resumes/${id}`);
  }

  async getUserProfile() {
    const result = await this.request<Profile>("GET", "/profile");
    return result;
  }
  async updateProfile(profile: Profile) {
    const result = await this.request<Profile>(
      "PATCH",
      `/profiles/${profile.id}`,
      {
        name: profile.name,
        email: profile.email,
        address: profile.address,
        linkedin: profile.linkedin,
      }
    );
  }

  async listUserEducations(): Promise<Education[]> {
    const result = await this.request<Education[]>("GET", "/educations");
    return result;
  }
  async updateEducation(education: Education) {
    const result = await this.request<Education>(
      "PATCH",
      `/educations/${education.id}`,
      {
        title: education.title,
        institution: education.institution,
        startDate: education.startDate,
        endDate: education.endDate,
      }
    );
  }
  async deleteEducation(id: string) {
    const result = await this.request<Education>("DELETE", `/educations/${id}`);
  }
  async addEducation(): Promise<Education> {
    const result = await this.request<Education>("POST", `/educations`);
    return result;
  }
  async getEducation(id: string) {
    const result = await this.request<Education>("GET", `/educations/${id}`);
    return result;
  }

  async listUserExperiences(): Promise<Experience[]> {
    const result = await this.request<Experience[]>("GET", "/experiences");
    return result;
  }
  async updateExperience(experience: Experience) {
    const result = await this.request<Experience>(
      "PATCH",
      `/experiences/${experience.id}`,
      {
        title: experience.title,
        company: experience.company,
        description: experience.description,
        startDate: experience.startDate,
        endDate: experience.endDate,
      }
    );
  }
  async deleteExperience(id: string) {
    const result = await this.request<Experience>(
      "DELETE",
      `/experiences/${id}`
    );
  }
  async addExperience() {
    const result = await this.request<Experience>("POST", `/experiences`);
    return result;
  }
  async getExperience(id: string) {
    const result = await this.request<Experience>("GET", `/experiences/${id}`);
    return result;
  }

  private async request<T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    data?: unknown
  ): Promise<T> {
    const res = await axios
      .request<T>({
        baseURL: this.baseUrl,
        url: path,
        method,
        headers: this.token
          ? {
              Authorization: `Bearer ${this.token}`,
            }
          : undefined,
        data,
      })
      .catch((err: AxiosError) => {
        console.error(
          "axiosError",
          method,
          path,
          data,
          err.message,
          err.response?.data
        );
        const msg =
          // @ts-ignore
          err.response?.data?.message ?? err.message ?? "Unknown error";
        throw new Error(msg);
      });

    return res.data;
  }
}
