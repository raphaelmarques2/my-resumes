import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { CreateResumeDto, createResumeDtoSchema } from './dtos/CreateResumeDto';
import { ResumeDto } from './dtos/ResumeDto';
import { UpdateResumeDto, updateResumeDtoSchema } from './dtos/UpdateResumeDto';
import { validateDto, validateId } from '../../services/validation';

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

    return ResumeDto.createFrom(resume);
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
    return ResumeDto.createFrom(resume);
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
    return resumes.map((item) => ResumeDto.createFrom(item));
  }

  async updateResume(id: string, data: UpdateResumeDto): Promise<ResumeDto> {
    validateId(id);
    validateDto(data, updateResumeDtoSchema);

    const updatedResume = await this.prisma.$transaction(async (prisma) => {
      const resume = await prisma.resume.findUnique({ where: { id } });
      if (!resume) {
        throw new NotFoundException();
      }

      if (data.experiences !== undefined) {
        await prisma.experienceToResume.deleteMany({
          where: { resumeId: resume.id },
        });
        await prisma.experienceToResume.createMany({
          data: data.experiences.map((e) => ({
            experienceId: e,
            resumeId: id,
          })),
        });
      }

      const updatedResume = await prisma.resume.update({
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

      return updatedResume;
    });

    return ResumeDto.createFrom(updatedResume);
  }

  async deleteResume(id: string): Promise<void> {
    validateId(id);

    await this.prisma.$transaction(async (prisma) => {
      const resume = await prisma.resume.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!resume) throw new NotFoundException('Experience not found');

      await prisma.resume.delete({
        where: { id },
      });
    });
  }
}
