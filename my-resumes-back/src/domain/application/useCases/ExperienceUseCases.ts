import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExperienceDto } from '../dtos/ExperienceDto';
import { CreateExperienceDto } from '../dtos/CreateExperienceDto';
import { UpdateExperienceDto } from '../dtos/UpdateExperienceDto';
import { PrismaService } from 'src/domain/application/services/PrismaService';

@Injectable()
export class ExperienceUseCases {
  constructor(private prisma: PrismaService) {}

  async createExperience(input: CreateExperienceDto): Promise<ExperienceDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: input.userId },
    });
    if (!user) throw new BadRequestException('Invalid userId');

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

  async getExperienceById(id: string): Promise<ExperienceDto> {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!experience) throw new NotFoundException('Experience not found');

    return ExperienceDto.fromEntity(experience);
  }

  async listUserExperiences(userId: string): Promise<ExperienceDto[]> {
    const experiences = await this.prisma.experience.findMany({
      where: { userId },
      orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
    });
    return experiences.map((e) => ExperienceDto.fromEntity(e));
  }

  async updateExperience(
    id: string,
    data: UpdateExperienceDto,
  ): Promise<ExperienceDto> {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    const updatedExperience = await this.prisma.experience.update({
      where: { id },
      data: {
        title: data.title,
        company: data.company,
        description: data.description,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        technologies: data.technologies,
      },
    });

    return ExperienceDto.fromEntity(updatedExperience);
  }

  async deleteExperience(id: string): Promise<void> {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!experience) throw new NotFoundException('Experience not found');

    await this.prisma.experience.delete({
      where: { id },
      include: {
        experienceToResumes: true,
      },
    });
  }
}
