import { Id } from '../../../common/domain/value-objects/Id';
import { Name } from '../../../common/domain/value-objects/Name';
import { Email } from '../../../common/domain/value-objects/Email';

export class User {
  private constructor(
    public readonly id: Id,
    public name: Name,
    public email: Email,
  ) {}

  static create({ id, name, email }: { id: Id; name: Name; email: Email }) {
    return new User(id, name, email);
  }
  static load({ id, name, email }: { id: Id; name: Name; email: Email }) {
    return new User(id, name, email);
  }
}
