import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExperienceDto } from './dtos/ExperienceDto';
import { CreateExperienceDto } from './dtos/CreateExperienceDto';
import {
  UpdateExperienceDto,
  updateExperienceDtoSchema,
} from './dtos/UpdateExperienceDto';
import { PrismaService } from 'src/modules/common/infra/PrismaService';
import {
  validateDto,
  validateId,
} from '../../../../modules/common/application/validation';

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

    return ExperienceDto.createFrom(experience);
  }

  async getExperienceById(id: string): Promise<ExperienceDto> {
    validateId(id);

    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!experience) throw new NotFoundException('Experience not found');

    return ExperienceDto.createFrom(experience);
  }

  async listUserExperiences(userId: string): Promise<ExperienceDto[]> {
    validateId(userId);

    const experiences = await this.prisma.experience.findMany({
      where: { userId },
      orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
    });
    return experiences.map((e) => ExperienceDto.createFrom(e));
  }

  async updateExperience(
    id: string,
    data: UpdateExperienceDto,
  ): Promise<ExperienceDto> {
    validateId(id);
    validateDto(data, updateExperienceDtoSchema);

    const updatedExperience = await this.prisma.$transaction(async (prisma) => {
      const experience = await prisma.experience.findUnique({
        where: { id },
      });
      if (!experience) {
        throw new NotFoundException('Experience not found');
      }

      const updatedExperience = await prisma.experience.update({
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

      return updatedExperience;
    });

    return ExperienceDto.createFrom(updatedExperience);
  }

  async deleteExperience(id: string): Promise<void> {
    validateId(id);

    await this.prisma.$transaction(async (prisma) => {
      const experience = await prisma.experience.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!experience) throw new NotFoundException('Experience not found');

      await prisma.experience.delete({
        where: { id },
      });
    });
  }
}
