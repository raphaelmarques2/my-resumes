import { Inject, Injectable } from '@nestjs/common';
import { MemoryProfileRepository } from '../repositories/memory/MemoryProfileRepository';
import { ResumeService } from 'src/domain/application/services/ResumeService';
import { ExperienceService } from 'src/domain/application/services/ExperienceService';
import { MemoryResumeRepository } from '../repositories/memory/MemoryResumeRepository';
import { MemoryExperienceRepository } from '../repositories/memory/MemoryExperienceRepository';
import { ProfileService } from 'src/domain/application/services/ProfileService';
import { ResumeRepository } from 'src/domain/application/repositories/ResumeRepository';
import { ExperienceRepository } from 'src/domain/application/repositories/ExperienceRepository';
import { ProfileRepository } from 'src/domain/application/repositories/ProfileRepository';

@Injectable()
export class PopulateService {
  constructor(
    @Inject(ResumeRepository)
    private resumeRepository: MemoryResumeRepository,
    @Inject(ExperienceRepository)
    private experienceRepository: MemoryExperienceRepository,
    @Inject(ProfileRepository)
    private profileRepository: MemoryProfileRepository,
    private resumeService: ResumeService,
    private experienceService: ExperienceService,
    private profileService: ProfileService,
  ) {}

  async populate() {
    console.log('populating db...');

    this.resumeRepository.entities.clear();
    this.experienceRepository.entities.clear();
    this.profileRepository.entities.clear();

    const userId = '123';

    const cs = await Promise.all(
      ['A', 'B', 'C'].map((n) =>
        this.resumeService.create({
          userId,
          title: `CV ${n}`,
          description: `description ${n}`,
        }),
      ),
    );

    const es = await Promise.all(
      ['1', '2', '3', '4', '5', '6'].map((n) =>
        this.experienceService.create({
          companyName: `Company ${n}`,
          title: `Manager ${n}`,
          userId,
          technologies: ['Node', 'C#'],
        }),
      ),
    );

    const cIds = cs.map((c) => c.id);
    const eIds = es.map((e) => e.id);

    await this.resumeService.addExperience(cIds[0], eIds[0]);
    await this.resumeService.addExperience(cIds[0], eIds[1]);
    await this.resumeService.addExperience(cIds[0], eIds[2]);
    await this.resumeService.addExperience(cIds[0], eIds[3]);
    await this.resumeService.addExperience(cIds[0], eIds[4]);
    await this.resumeService.addExperience(cIds[0], eIds[5]);

    await this.resumeService.addExperience(cIds[1], eIds[1]);
    await this.resumeService.addExperience(cIds[1], eIds[2]);
    await this.resumeService.addExperience(cIds[1], eIds[4]);

    await this.profileService.create({
      name: 'Raphael Marques',
      email: 'jose.raphael.marques@gmail.com',
      userId,
      address: 'João Pessoa, PB - Brazil',
      linkedin: 'https://www.linkedin.com/in/raphaelmarques84/',
    });
  }
}
