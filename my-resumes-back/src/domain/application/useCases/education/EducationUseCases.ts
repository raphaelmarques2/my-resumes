import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../services/PrismaService';
import {
  CreateEducationDto,
  createEducationDtoSchema,
} from './dtos/CreateEducationDto';
import { EducationDto } from './dtos/EducationDto';
import { validateDto, validateId } from '../../services/validation';
import {
  UpdateEducationDto,
  updateEducationDtoSchema,
} from './dtos/UpdateEducationDto';

@Injectable()
export class EducationUseCases {
  constructor(private prisma: PrismaService) {}

  async createEducation(data: CreateEducationDto): Promise<EducationDto> {
    validateDto(data, createEducationDtoSchema);

    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) throw new BadRequestException('Invalid userId');

    const education = await this.prisma.education.create({
      data: {
        userId: data.userId,
        title: data.title,
        institution: data.institution,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
      },
    });

    return EducationDto.createFrom(education);
  }
  async updateEducation(
    id: string,
    data: UpdateEducationDto,
  ): Promise<EducationDto> {
    validateId(id);
    validateDto(data, updateEducationDtoSchema);

    const updatedEducation = await this.prisma.$transaction(async (prisma) => {
      const education = await prisma.education.findUnique({
        where: { id },
      });
      if (!education) {
        throw new NotFoundException('Education not found');
      }

      const updatedEducation = await prisma.education.update({
        where: { id },
        data: {
          title: data.title,
          institution: data.institution,
          startDate: data.startDate || null,
          endDate: data.endDate || null,
        },
      });

      return updatedEducation;
    });
    return EducationDto.createFrom(updatedEducation);
  }

  async getEducationById(id: string): Promise<EducationDto> {
    validateId(id);

    const education = await this.prisma.education.findUnique({
      where: { id },
    });

    if (!education) throw new NotFoundException('Education not found');

    return EducationDto.createFrom(education);
  }

  async listUserEducations(userId: string): Promise<EducationDto[]> {
    validateId(userId);

    const educations = await this.prisma.education.findMany({
      where: { userId },
      orderBy: [
        { endDate: 'desc' },
        { startDate: 'desc' },
        { updatedAt: 'desc' },
      ],
    });

    return educations.map((e) => EducationDto.createFrom(e));
  }

  async deleteEducation(id: string): Promise<void> {
    validateId(id);

    await this.prisma.$transaction(async (prisma) => {
      const education = await prisma.education.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!education) throw new NotFoundException('Education not found');

      await prisma.education.delete({
        where: { id },
      });
    });
  }
}
