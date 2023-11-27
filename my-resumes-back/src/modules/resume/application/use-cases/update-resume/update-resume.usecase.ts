import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionService } from 'src/modules/common/application/repositories/TransactionService';
import { Id } from 'src/modules/common/application/value-objects/Id';
import { Name } from 'src/modules/common/application/value-objects/Name';
import {
  validateDto,
  validateId,
} from '../../../../common/application/validation';
import { ResumeDto } from '../../entities/ResumeDto';
import { ResumeRepository } from '../../repositories/ResumeRepository';
import { UpdateResumeDto, updateResumeDtoSchema } from './UpdateResumeDto';

@Injectable()
export class UpdateResumeUseCase {
  constructor(
    private transactionService: TransactionService,
    private resumeRepository: ResumeRepository,
  ) {}

  async execute(id: string, data: UpdateResumeDto): Promise<ResumeDto> {
    validateId(id);
    validateDto(data, updateResumeDtoSchema);

    const updatedResume = await this.transactionService.transaction(
      async (transaction) => {
        const resume = await this.resumeRepository.findById(new Id(id), {
          transaction,
        });
        if (!resume) {
          throw new NotFoundException();
        }

        resume.update({
          title: this.convertName(data.title),
          description: data.description,
          experiences: this.convertExperiences(data.experiences),
        });

        await this.resumeRepository.update(resume, { transaction });

        return resume;
      },
    );

    return ResumeDto.createFrom(updatedResume);
  }

  private convertName(title: string | undefined): Name | undefined {
    if (title === undefined) return undefined;
    return new Name(title);
  }
  private convertExperiences(
    experiences: string[] | undefined,
  ): Id[] | undefined {
    if (experiences === undefined) return undefined;
    return experiences.map((e) => new Id(e));
  }
}
