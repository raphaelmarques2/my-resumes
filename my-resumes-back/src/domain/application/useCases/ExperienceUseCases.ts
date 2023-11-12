import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExperienceDto, convertToExperienceDto } from '../dtos/ExperienceDto';
import { CreateExperienceDto } from '../dtos/CreateExperienceDto';
import {
  UpdateExperienceDto,
  updateExperienceDtoSchema,
} from '../dtos/UpdateExperienceDto';
import { PrismaService } from 'src/domain/application/services/PrismaService';
import { validateDto, validateId } from '../dtos/validate';

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
        description: input.description || '',
        startDate: input.startDate || null,
        endDate: input.endDate || null,
      },
    });

    return convertToExperienceDto(experience);
  }

  async getExperienceById(id: string): Promise<ExperienceDto> {
    validateId(id);

    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!experience) throw new NotFoundException('Experience not found');

    return convertToExperienceDto(experience);
  }

  async listUserExperiences(userId: string): Promise<ExperienceDto[]> {
    const experiences = await this.prisma.experience.findMany({
      where: { userId },
      orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
    });
    return experiences.map((e) => convertToExperienceDto(e));
  }

  async updateExperience(
    id: string,
    data: UpdateExperienceDto,
  ): Promise<ExperienceDto> {
    validateId(id);
    validateDto(data, updateExperienceDtoSchema);

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

    return convertToExperienceDto(updatedExperience);
  }

  async deleteExperience(id: string): Promise<void> {
    validateId(id);

    const experience = await this.prisma.experience.findUnique({
      where: { id },
      include: {
        experienceToResumes: true,
      },
    });
    if (!experience) throw new NotFoundException('Experience not found');

    await this.prisma.experience.delete({
      where: { id },
    });
  }
}
