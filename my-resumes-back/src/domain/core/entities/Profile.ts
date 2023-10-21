import { Address } from '../value-objects/Address';
import { Email } from '../value-objects/Email';
import { Id } from '../value-objects/Id';
import { Name } from '../value-objects/Name';
import { Url } from '../value-objects/Url';

export type ProfileProps = {
  id: Id;
  userId: Id;
  name: Name;
  email: Email;
  address: Address | null;
  linkedin: Url | null;
};

export class Profile implements ProfileProps {
  id: Id;
  userId: Id;
  name: Name;
  email: Email;
  address: Address | null;
  linkedin: Url | null;

  private constructor(props: ProfileProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.email = props.email;
    this.address = props.address;
    this.linkedin = props.linkedin;
  }

  update(
    props: Partial<
      Pick<ProfileProps, 'name' | 'email' | 'address' | 'linkedin'>
    >,
  ) {
    if (props.name !== undefined) this.name = props.name;
    if (props.email !== undefined) this.email = props.email;
    if (props.address !== undefined) this.address = props.address;
    if (props.linkedin !== undefined) this.linkedin = props.linkedin;
  }

  static createNew(props: Omit<ProfileProps, 'id'>) {
    return new Profile({
      id: new Id(),
      ...props,
    });
  }

  static load(props: ProfileProps) {
    return new Profile(props);
  }
}
