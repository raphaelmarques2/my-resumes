import { Id } from 'src/modules/common/application/value-objects/Id';
import { Name } from 'src/modules/common/application/value-objects/Name';

export class Experience {
  private constructor(
    readonly id: Id,
    readonly userId: Id,
    public title: Name,
    public company: Name,
    public description: string,
    public startDate: Date | null,
    public endDate: Date | null,
    public technologies: Name[],
  ) {}

  update(input: {
    title?: Name;
    company?: Name;
    description?: string;
    startDate?: Date | null;
    endDate?: Date | null;
    technologies?: Name[];
  }) {
    if (input.title !== undefined) this.title = input.title;
    if (input.company !== undefined) this.company = input.company;
    if (input.description !== undefined) this.description = input.description;
    if (input.startDate !== undefined) this.startDate = input.startDate;
    if (input.endDate !== undefined) this.endDate = input.endDate;
    if (input.technologies !== undefined)
      this.technologies = input.technologies;
  }

  static create({
    userId,
    title,
    company,
  }: {
    userId: Id;
    title: Name;
    company: Name;
  }) {
    return new Experience(new Id(), userId, title, company, '', null, null, []);
  }

  static load({
    id,
    userId,
    title,
    company,
    description,
    startDate,
    endDate,
    technologies,
  }: {
    id: Id;
    userId: Id;
    title: Name;
    company: Name;
    description: string;
    startDate: Date | null;
    endDate: Date | null;
    technologies: Name[];
  }) {
    return new Experience(
      id,
      userId,
      title,
      company,
      description,
      startDate,
      endDate,
      technologies,
    );
  }
}
