import { Entity } from 'src/modules/common/application/value-objects/Entity';
import { Id } from 'src/modules/common/application/value-objects/Id';
import { Name } from 'src/modules/common/application/value-objects/Name';

export class Resume implements Entity {
  private constructor(
    readonly id: Id,
    readonly userId: Id,
    public title: Name,
    public description: string,
    public experiences: Id[],
    public educations: Id[],
    readonly updatedAt: Date,
  ) {}

  update(input: {
    title?: Name;
    description?: string;
    experiences?: Id[];
    educations?: Id[];
  }) {
    if (input.title !== undefined) this.title = input.title;
    if (input.description !== undefined) this.description = input.description;
    if (input.experiences !== undefined) this.experiences = input.experiences;
    if (input.educations !== undefined) this.educations = input.educations;
  }

  static create({
    userId,
    title,
    description,
    experiences,
    educations,
  }: {
    userId: Id;
    title: Name;
    description?: string;
    experiences?: Id[];
    educations?: Id[];
  }) {
    return new Resume(
      new Id(),
      userId,
      title,
      description ?? '',
      experiences ?? [],
      educations ?? [],
      new Date(),
    );
  }

  static load({
    id,
    userId,
    title,
    description,
    experiences,
    educations,
    updatedAt,
  }: {
    id: Id;
    userId: Id;
    title: Name;
    description: string;
    experiences: Id[];
    educations: Id[];
    updatedAt: Date;
  }) {
    return new Resume(
      id,
      userId,
      title,
      description,
      experiences,
      educations,
      updatedAt,
    );
  }
}
