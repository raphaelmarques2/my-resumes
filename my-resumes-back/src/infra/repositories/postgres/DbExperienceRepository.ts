import { ExperienceRepository } from 'src/domain/application/repositories/ExperienceRepository';
import { Experience } from 'src/domain/core/entities/Experience';
import { Id } from 'src/domain/core/value-objects/Id';
import { PrismaService } from '../PrismaService';
import { Experience as ExperienceModel } from '@prisma/client';
import { Name } from 'src/domain/core/value-objects/Name';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MyConfigService } from 'src/infra/services/MyConfigService';

@Injectable()
export class DbExperienceRepository implements ExperienceRepository {
  constructor(
    private prisma: PrismaService,
    private config: MyConfigService,
  ) {}

  async listByUserId(userId: Id): Promise<Experience[]> {
    const items = await this.prisma.experience.findMany({
      where: { userId: userId.value },
      orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
    });
    return items.map((item) => this.transformToEntity(item));
  }
  async save(entity: Experience): Promise<void> {
    if (this.config.logDb) console.log('saving experience:', entity);
    await this.prisma.experience.upsert({
      where: { id: entity.id.value },
      update: {
        title: entity.title,
        company: entity.companyName,
        description: entity.description,
        startDate: entity.startDate ?? null,
        endDate: entity.endDate ?? null,
        technologies: entity.technologies.map((e) => e.value),
        userId: entity.userId.value,
      },
      create: {
        id: entity.id.value,
        title: entity.title,
        company: entity.companyName,
        description: entity.description,
        startDate: entity.startDate,
        endDate: entity.endDate,
        technologies: entity.technologies.map((e) => e.value),
        userId: entity.userId.value,
      },
    });
  }
  async load(id: Id): Promise<Experience> {
    const item = await this.prisma.experience.findUnique({
      where: { id: id.value },
    });
    if (!item) throw new NotFoundException('Experience not found');
    return this.transformToEntity(item);
  }

  async delete(id: Id): Promise<void> {
    await this.prisma.$transaction(async (transaction) => {
      await transaction.experienceToResume.deleteMany({
        where: {
          experienceId: id.value,
        },
      });
      await transaction.experience.delete({
        where: {
          id: id.value,
        },
      });
    });
  }

  private transformToEntity(item: ExperienceModel): Experience {
    return Experience.load({
      id: new Id(item.id),
      userId: new Id(item.userId),
      title: item.title,
      companyName: item.company,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate,
      technologies: item.technologies
        ? item.technologies.map((e) => new Name(e))
        : [],
    });
  }
}
