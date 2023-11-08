import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { CreateResumeDto } from '../dtos/CreateResumeDto';
import { ResumeDto } from '../dtos/ResumeDto';
import { UpdateResumeDto } from '../dtos/UpdateResumeDto';

@Injectable()
export class ResumeUseCases {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateResumeDto): Promise<ResumeDto> {
    const resume = await this.prisma.resume.create({
      data: {
        userId: input.userId,
        title: input.title,
        description: input.description || '',
      },
      include: {
        experienceToResumes: {
          select: { id: true },
        },
      },
    });

    return ResumeDto.fromEntity(resume);
  }

  async findById(id: string): Promise<ResumeDto> {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
      include: {
        experienceToResumes: {
          select: { id: true },
        },
      },
    });
    if (!resume) {
      throw new NotFoundException();
    }
    return ResumeDto.fromEntity(resume);
  }

  async listByUserId(userId: string): Promise<ResumeDto[]> {
    const resumes = await this.prisma.resume.findMany({
      where: { userId },
      include: {
        experienceToResumes: {
          select: { id: true },
        },
      },
    });
    return resumes.map((item) => ResumeDto.fromEntity(item));
  }

  async update(id: string, data: UpdateResumeDto): Promise<ResumeDto> {
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
          select: { id: true },
        },
      },
    });

    return ResumeDto.fromEntity(updatedResume);
  }

  async deleteResume(id: string): Promise<void> {
    await this.prisma.resume.delete({
      where: { id },
      include: {
        experienceToResumes: true,
      },
    });
  }
}
