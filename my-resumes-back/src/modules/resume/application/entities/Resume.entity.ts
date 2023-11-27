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
  ) {}

  update(input: { title?: Name; description?: string; experiences?: Id[] }) {
    if (input.title !== undefined) this.title = input.title;
    if (input.description !== undefined) this.description = input.description;
    if (input.experiences !== undefined) this.experiences = input.experiences;
  }

  static create({
    userId,
    title,
    description,
    experiences,
  }: {
    userId: Id;
    title: Name;
    description?: string;
    experiences?: Id[];
  }) {
    return new Resume(
      new Id(),
      userId,
      title,
      description ?? '',
      experiences ?? [],
    );
  }

  static load({
    id,
    userId,
    title,
    description,
    experiences,
  }: {
    id: Id;
    userId: Id;
    title: Name;
    description: string;
    experiences: Id[];
  }) {
    return new Resume(id, userId, title, description, experiences);
  }
}
