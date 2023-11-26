import { BadRequestException, Injectable } from '@nestjs/common';
import { Id } from 'src/modules/common/domain/value-objects/Id';
import { Name } from 'src/modules/common/domain/value-objects/Name';
import { validateDto } from '../../../common/application/validation';
import { Resume } from '../../entities/Resume.entity';
import { ResumeDto } from '../../entities/ResumeDto';
import { ResumeRepository } from '../../repositories/ResumeRepository';
import { CreateResumeDto, createResumeDtoSchema } from './CreateResumeDto';
import { UserRepository } from 'src/modules/auth/application/repositories/UserRepository';

@Injectable()
export class CreateResumeUseCase {
  constructor(
    private userRepository: UserRepository,
    private resumeRepository: ResumeRepository,
  ) {}

  async execute(input: CreateResumeDto): Promise<ResumeDto> {
    validateDto(input, createResumeDtoSchema);

    const userExists = await this.userRepository.userExists(
      new Id(input.userId),
    );
    if (!userExists) throw new BadRequestException('Invalid userId');

    const resume = Resume.create({
      userId: new Id(input.userId),
      title: new Name(input.title),
      description: input.description,
      experiences: input.experiences?.map((e) => new Name(e)),
    });

    await this.resumeRepository.add(resume);

    return ResumeDto.createFrom(resume);
  }
}
