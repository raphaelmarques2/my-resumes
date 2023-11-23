import { Id } from 'src/modules/common/domain/value-objects/Id';

export class Profile {
  private constructor(
    readonly id: Id,
    readonly userId: Id,
    public name: string,
    public email: string,
    public address: string | null,
    public linkedin: string | null,
  ) {}

  static create({
    id,
    userId,
    name,
    email,
  }: {
    id: Id;
    userId: Id;
    name: string;
    email: string;
  }) {
    return new Profile(id, userId, name, email, null, null);
  }
}
