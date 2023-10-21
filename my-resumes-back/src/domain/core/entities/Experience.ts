import { Id } from '../value-objects/Id';
import { Name } from '../value-objects/Name';

export type ExperienceProps = {
  id: Id;
  userId: Id;
  title: string;
  companyName: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  technologies: Name[];
};

export class Experience implements ExperienceProps {
  id: Id;
  userId: Id;
  title: string;
  companyName: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  technologies: Name[];

  private constructor(props: ExperienceProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.title = props.title;
    this.companyName = props.companyName;
    this.description = props.description;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.technologies = props.technologies;
  }

  update(
    props: Partial<
      Pick<ExperienceProps, 'title' | 'companyName' | 'description'>
    >,
  ) {
    if (props.title !== undefined) this.title = props.title;
    if (props.companyName !== undefined) this.companyName = props.companyName;
    if (props.description !== undefined) this.description = props.description;
  }

  setStartDate(value: string | Date | null) {
    if (typeof value === 'string') {
      this.startDate = new Date(value);
    } else {
      this.startDate = value;
    }
  }
  setEndDate(value: string | Date | null) {
    if (typeof value === 'string') {
      this.endDate = new Date(value);
    } else {
      this.endDate = value;
    }
  }
  setTechnologies(value: string[] | Name[]) {
    if (value.length === 0) {
      this.technologies = [];
    } else {
      this.technologies = value.map((e) => {
        if (typeof e === 'string') {
          return new Name(e);
        } else {
          return e;
        }
      });
    }
  }

  static createNew(
    props: Omit<ExperienceProps, 'id' | 'description' | 'technologies'> &
      Partial<Pick<ExperienceProps, 'description' | 'technologies'>>,
  ): Experience {
    return new Experience({
      id: new Id(),
      description: '',
      technologies: [],
      ...props,
    });
  }

  static load(props: ExperienceProps) {
    return new Experience(props);
  }
}
