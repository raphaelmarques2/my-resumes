import { Id } from '../value-objects/Id';
import { Name } from '../value-objects/Name';
import { Experience } from './Experience';

export type ResumeProps = {
  id: Id;
  userId: Id;
  title: Name;
  description: string;
  experiences: Id[];
};

export class Resume implements ResumeProps {
  id: Id;
  userId: Id;
  title: Name;
  description: string;
  experiences: Id[];

  private constructor(props: ResumeProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.title = props.title;
    this.description = props.description;
    this.experiences = props.experiences;
  }

  addExperience(experience: Experience) {
    if (!this.experiences.find((e) => e.value === experience.id.value)) {
      this.experiences.push(experience.id);
    }
  }
  removeExperience(experience: Experience) {
    this.experiences = this.experiences.filter(
      (e) => e.value !== experience.id.value,
    );
  }

  update(
    props: Partial<Pick<ResumeProps, 'title' | 'description' | 'experiences'>>,
  ) {
    if (props.title !== undefined) this.title = props.title;
    if (props.description !== undefined) this.description = props.description;
    if (props.experiences !== undefined) this.experiences = props.experiences;
  }

  static createNew(
    props: Omit<ResumeProps, 'id' | 'experiences' | 'description'> &
      Partial<Pick<ResumeProps, 'experiences' | 'description'>>,
  ) {
    return new Resume({
      id: new Id(),
      experiences: [],
      description: '',
      ...props,
    });
  }

  static load(props: ResumeProps) {
    return new Resume(props);
  }
}
