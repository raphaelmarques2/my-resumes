import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import {
  CreateResumeDto,
  createResumeDtoSchema,
} from '../dtos/CreateResumeDto';
import { ResumeDto, convertToResumeDto } from '../dtos/ResumeDto';
import {
  UpdateResumeDto,
  updateResumeDtoSchema,
} from '../dtos/UpdateResumeDto';
import { validateDto, validateId } from '../dtos/validate';

@Injectable()
export class ResumeUseCases {
  constructor(private prisma: PrismaService) {}

  async createResume(input: CreateResumeDto): Promise<ResumeDto> {
    validateDto(input, createResumeDtoSchema);

    const resume = await this.prisma.resume.create({
      data: {
        userId: input.userId,
        title: input.title,
        description: input.description || '',
        experienceToResumes: input.experiences && {
          createMany: {
            data: input.experiences.map((e) => ({
              experienceId: e,
            })),
          },
        },
      },
      include: {
        experienceToResumes: {
          select: { experienceId: true },
        },
      },
    });

    return convertToResumeDto(resume);
  }

  async getResumeById(id: string): Promise<ResumeDto> {
    validateId(id);

    const resume = await this.prisma.resume.findUnique({
      where: { id },
      include: {
        experienceToResumes: {
          select: { experienceId: true },
        },
      },
    });
    if (!resume) {
      throw new NotFoundException();
    }
    return convertToResumeDto(resume);
  }

  async listUserResumes(userId: string): Promise<ResumeDto[]> {
    validateId(userId);

    const resumes = await this.prisma.resume.findMany({
      where: { userId },
      include: {
        experienceToResumes: {
          select: { experienceId: true },
        },
      },
    });
    return resumes.map((item) => convertToResumeDto(item));
  }

  async updateResume(id: string, data: UpdateResumeDto): Promise<ResumeDto> {
    validateId(id);
    validateDto(data, updateResumeDtoSchema);

    const resume = await this.prisma.resume.findUnique({ where: { id } });
    if (!resume) {
      throw new NotFoundException();
    }

    if (data.experiences !== undefined) {
      const experiences = await this.prisma.experience.findMany({
        where: {
          id: { in: data.experiences },
        },
      });
      await this.prisma.resume.update({
        where: { id },
        data: {
          experienceToResumes: {
            set: experiences.map((item) => ({ id: item.id })),
          },
        },
      });
    }

    const updatedResume = await this.prisma.resume.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
      },
      include: {
        experienceToResumes: {
          select: { experienceId: true },
        },
      },
    });

    return convertToResumeDto(updatedResume);
  }

  async deleteResume(id: string): Promise<void> {
    validateId(id);

    await this.prisma.resume.delete({
      where: { id },
    });
  }
}
