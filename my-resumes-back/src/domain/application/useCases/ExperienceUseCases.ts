import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperienceDto } from '../dtos/ExperienceDto';
import { CreateExperienceDto } from '../dtos/CreateExperienceDto';
import { UpdateExperienceDto } from '../dtos/UpdateExperienceDto';
import { PrismaService } from 'src/domain/application/services/PrismaService';

@Injectable()
export class ExperienceUseCases {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateExperienceDto): Promise<ExperienceDto> {
    const experience = await this.prisma.experience.create({
      data: {
        userId: input.userId,
        title: input.title,
        company: input.company,
        technologies: input.technologies,
        description: '',
      },
    });

    return ExperienceDto.fromEntity(experience);
  }

  async findById(id: string): Promise<ExperienceDto> {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!experience) {
      throw new NotFoundException();
    }
    return ExperienceDto.fromEntity(experience);
  }

  async listByUserId(userId: string): Promise<ExperienceDto[]> {
    const experiences = await this.prisma.experience.findMany({
      where: { userId },
      orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
    });
    return experiences.map((e) => ExperienceDto.fromEntity(e));
  }

  async update(id: string, data: UpdateExperienceDto): Promise<ExperienceDto> {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!experience) {
      throw new NotFoundException();
    }

    await this.prisma.experience.update({
      where: { id },
      data: {
        title: data.title,
        company: data.company,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        technologies: data.technologies,
      },
    });

    return ExperienceDto.fromEntity(experience);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.experience.delete({
      where: { id },
      include: {
        experienceToResumes: true,
      },
    });
  }
}
