import { Injectable } from '@nestjs/common';
import { Experience } from '../../core/entities/Experience';
import { Resume } from '../../core/entities/Resume';
import { Id } from '../../core/value-objects/Id';
import { Name } from '../../core/value-objects/Name';
import { EntityNotFoundError } from '../../errors/EntityNotFoundError';
import { CreateResumeDto } from '../dtos/CreateResumeDto';
import { ResumeDto } from '../dtos/ResumeDto';
import { UpdateResumeDto } from '../dtos/UpdateResumeDto';
import { ExperienceRepository } from '../repositories/ExperienceRepository';
import { ResumeRepository } from '../repositories/ResumeRepository';

@Injectable()
export class ResumeService {
  constructor(
    private resumeRepository: ResumeRepository,
    private experienceRepository: ExperienceRepository,
  ) {}

  async create(input: CreateResumeDto): Promise<ResumeDto> {
    const resume = Resume.createNew({
      userId: new Id(input.userId),
      title: new Name(input.title),
      description: input.description,
    });

    await this.resumeRepository.save(resume);

    const dto = ResumeDto.fromEntity(resume);
    return dto;
  }

  async findById(id: string): Promise<ResumeDto> {
    const resume = await this.resumeRepository.load(new Id(id));
    return ResumeDto.fromEntity(resume);
  }

  async listByUserId(userId: string): Promise<ResumeDto[]> {
    const resumes = await this.resumeRepository.listByUserId(new Id(userId));
    return resumes.map((item) => ResumeDto.fromEntity(item));
  }

  async addExperience(resumeId: string, experienceId: string): Promise<void> {
    const resume = await this.resumeRepository.load(new Id(resumeId));

    const experience = await this.experienceRepository.load(
      new Id(experienceId),
    );

    resume.addExperience(experience);

    await this.resumeRepository.save(resume);
  }

  async removeExperience(resumeId: string, experienceId: string) {
    const resume = await this.resumeRepository.load(new Id(resumeId));
    if (!resume) throw new EntityNotFoundError(Resume);

    const experience = await this.experienceRepository.load(
      new Id(experienceId),
    );
    if (!experience) throw new EntityNotFoundError(Experience);

    resume.removeExperience(experience);

    await this.resumeRepository.save(resume);
  }

  async update(id: string, data: UpdateResumeDto): Promise<ResumeDto> {
    const resume = await this.resumeRepository.load(new Id(id));

    resume.update({
      title: data.title !== undefined ? new Name(data.title) : undefined,
      description: data.description,
      experiences:
        data.experiences !== undefined
          ? data.experiences.map((e) => new Id(e))
          : undefined,
    });

    await this.resumeRepository.save(resume);

    return ResumeDto.fromEntity(resume);
  }

  async deleteResume(id: string): Promise<void> {
    await this.resumeRepository.delete(new Id(id));
  }
}
