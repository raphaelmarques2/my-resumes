import { ResumeRepository } from 'src/domain/application/repositories/ResumeRepository';
import { Resume } from 'src/domain/core/entities/Resume';
import { Id } from 'src/domain/core/value-objects/Id';
import { PrismaService } from '../PrismaService';
import { Resume as ResumeModel } from '@prisma/client';
import { Name } from 'src/domain/core/value-objects/Name';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MyConfigService } from 'src/infra/services/MyConfigService';

type ResumeAndExperiencesModel = ResumeModel & {
  experienceToResumes: { experienceId: string }[];
};

@Injectable()
export class DbResumeRepository implements ResumeRepository {
  constructor(
    private prisma: PrismaService,
    private config: MyConfigService,
  ) {}

  async listByUserId(userId: Id): Promise<Resume[]> {
    const items = await this.prisma.resume.findMany({
      where: { userId: userId.value },
      include: {
        experienceToResumes: { select: { experienceId: true } },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
    return items.map((item) => this.transformToEntity(item));
  }

  async save(entity: Resume): Promise<void> {
    if (this.config.logDb) console.log('saving resume:', entity);
    await this.prisma.$transaction(async (prisma) => {
      await prisma.resume.upsert({
        where: { id: entity.id.value },
        update: {
          title: entity.title.value,
          description: entity.description,
          userId: entity.userId.value,
        },
        create: {
          id: entity.id.value,
          title: entity.title.value,
          description: entity.description,
          userId: entity.userId.value,
        },
      });

      const existingExperiences = (
        await prisma.experienceToResume.findMany({
          where: {
            resumeId: entity.id.value,
          },
          select: {
            experienceId: true,
          },
        })
      ).map((e) => e.experienceId);

      const experiences = entity.experiences.map((e) => e.value);
      const experiencesToDelete = existingExperiences.filter(
        (e) => !experiences.includes(e),
      );
      const experiencesToAdd = experiences.filter(
        (e) => !existingExperiences.includes(e),
      );

      // console.log('experiences', experiences);
      // console.log('existingExperiences', existingExperiences);
      // console.log('experiencesToDelete', experiencesToDelete);
      // console.log('experiencesToAdd', experiencesToAdd);

      await prisma.experienceToResume.deleteMany({
        where: {
          resumeId: entity.id.value,
          experienceId: { in: experiencesToDelete },
        },
      });
      await prisma.experienceToResume.createMany({
        data: experiencesToAdd.map((experienceId) => ({
          resumeId: entity.id.value,
          experienceId,
        })),
      });
    });
  }

  async load(id: Id): Promise<Resume> {
    const item = await this.prisma.resume.findUnique({
      where: { id: id.value },
      include: {
        experienceToResumes: { select: { experienceId: true } },
      },
    });
    if (!item) throw new NotFoundException('Resume not found');
    return this.transformToEntity(item);
  }

  async delete(id: Id): Promise<void> {
    await this.prisma.$transaction(async (transaction) => {
      await transaction.experienceToResume.deleteMany({
        where: {
          resumeId: id.value,
        },
      });
      await transaction.resume.delete({
        where: {
          id: id.value,
        },
      });
    });
  }

  private transformToEntity(item: ResumeAndExperiencesModel): Resume {
    return Resume.load({
      id: new Id(item.id),
      userId: new Id(item.userId),
      title: new Name(item.title),
      description: item.description,
      experiences: item.experienceToResumes.map((e) => new Id(e.experienceId)),
    });
  }
}
