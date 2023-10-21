import { Injectable } from '@nestjs/common';
import { Experience } from '../../core/entities/Experience';
import { Id } from '../../core/value-objects/Id';
import { ExperienceRepository } from '../repositories/ExperienceRepository';
import { ExperienceDto } from '../dtos/ExperienceDto';
import { CreateExperienceDto } from '../dtos/CreateExperienceDto';
import { UpdateExperienceDto } from '../dtos/UpdateExperienceDto';
import { Name } from 'src/domain/core/value-objects/Name';

@Injectable()
export class ExperienceService {
  constructor(private experienceRepository: ExperienceRepository) {}

  async create(input: CreateExperienceDto): Promise<ExperienceDto> {
    const experience = Experience.createNew({
      userId: new Id(input.userId),
      title: input.title,
      companyName: input.companyName,
      endDate: null,
      startDate: null,
      technologies:
        input.technologies !== undefined
          ? input.technologies.map((e) => new Name(e))
          : [],
    });
    await this.experienceRepository.save(experience);
    return ExperienceDto.fromEntity(experience);
  }

  async findById(id: string): Promise<ExperienceDto> {
    const experience = await this.experienceRepository.load(new Id(id));
    return ExperienceDto.fromEntity(experience);
  }

  async listByUserId(userId: string): Promise<ExperienceDto[]> {
    const experiences = await this.experienceRepository.listByUserId(
      new Id(userId),
    );
    return experiences.map((e) => ExperienceDto.fromEntity(e));
  }

  async update(id: string, data: UpdateExperienceDto): Promise<ExperienceDto> {
    const experience = await this.experienceRepository.load(new Id(id));

    experience.update({
      title: data.title,
      companyName: data.companyName,
      description: data.description,
    });

    if (data.startDate !== undefined) {
      experience.setStartDate(data.startDate || null);
    }
    if (data.endDate !== undefined) {
      experience.setEndDate(data.endDate || null);
    }
    if (data.technologies !== undefined) {
      experience.setTechnologies(data.technologies);
    }

    await this.experienceRepository.save(experience);

    return ExperienceDto.fromEntity(experience);
  }

  async delete(id: string): Promise<void> {
    await this.experienceRepository.delete(new Id(id));
  }
}
