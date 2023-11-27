import { PrismaService } from 'src/modules/common/infra/PrismaService';
import { ResumeRepository } from '../../application/repositories/ResumeRepository';
import { TransactionOptions } from 'src/modules/common/application/repositories/TransactionService';
import { Id } from 'src/modules/common/application/value-objects/Id';
import { Resume } from '../../application/entities/Resume.entity';
import { PrismaClient, Resume as ResumeData } from '@prisma/client';
import { Name } from 'src/modules/common/application/value-objects/Name';
import { Injectable } from '@nestjs/common';

type ResumeDataAndExperiences = ResumeData & {
  experienceToResumes: {
    experienceId: string;
  }[];
};

@Injectable()
export class PrismaResumeRepository extends ResumeRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async add(
    resume: Resume,
    options?: TransactionOptions | undefined,
  ): Promise<void> {
    await this.prisma.or(options?.transaction).resume.create({
      data: {
        id: resume.id.value,
        userId: resume.userId.value,
        title: resume.title.value,
        description: resume.description,
        experienceToResumes: {
          createMany: {
            data: resume.experiences.map((e) => ({ experienceId: e.value })),
          },
        },
      },
    });
  }

  async update(
    resume: Resume,
    options?: TransactionOptions | undefined,
  ): Promise<void> {
    async function run(prisma: PrismaClient) {
      await prisma.experienceToResume.deleteMany({
        where: { resumeId: resume.id.value },
      });
      await prisma.resume.update({
        where: { id: resume.id.value },
        data: {
          title: resume.title.value,
          description: resume.description,
          experienceToResumes: {
            createMany: {
              data: resume.experiences.map((e) => ({ experienceId: e.value })),
            },
          },
        },
      });
    }

    if (options?.transaction) {
      await run(options.transaction as PrismaClient);
    } else {
      await this.prisma.$transaction(async (prisma) => {
        await run(prisma as PrismaClient);
      });
    }
  }

  async delete(
    id: Id,
    options?: TransactionOptions | undefined,
  ): Promise<void> {
    await this.prisma
      .or(options?.transaction)
      .resume.delete({ where: { id: id.value } });
  }

  async findById(
    id: Id,
    options?: TransactionOptions | undefined,
  ): Promise<Resume | null> {
    const data = await this.prisma.or(options?.transaction).resume.findUnique({
      where: { id: id.value },
      include: {
        experienceToResumes: {
          select: { experienceId: true },
        },
      },
    });
    if (!data) return null;
    return this.convertToEntity(data);
  }

  async listUserResumes(
    userId: Id,
    options?: TransactionOptions | undefined,
  ): Promise<Resume[]> {
    const data = await this.prisma.or(options?.transaction).resume.findMany({
      where: { userId: userId.value },
      include: {
        experienceToResumes: {
          select: { experienceId: true },
        },
      },
    });
    return data.map((e) => this.convertToEntity(e));
  }

  private convertToEntity(data: ResumeDataAndExperiences): Resume {
    return Resume.load({
      id: new Id(data.id),
      userId: new Id(data.userId),
      title: new Name(data.title),
      description: data.description,
      experiences: data.experienceToResumes.map((e) => new Id(e.experienceId)),
    });
  }
}
