import { Email } from '../value-objects/Email';
import { Id } from '../value-objects/Id';
import { Name } from '../value-objects/Name';

export type UserProps = {
  id: Id;
  name: Name;
  email: Email;
};

export class User implements UserProps {
  id: Id;
  name: Name;
  email: Email;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }

  static createNew(props: Omit<UserProps, 'id'>) {
    return new User({
      id: new Id(),
      ...props,
    });
  }
  static load(props: UserProps) {
    return new User(props);
  }
}
