import { Id } from 'src/modules/common/domain/value-objects/Id';

export class Credential {
  private constructor(
    readonly id: Id,
    readonly userId: Id,
    public password: string,
  ) {}

  static create({
    id,
    userId,
    password,
  }: {
    id: Id;
    userId: Id;
    password: string;
  }) {
    return new Credential(id, userId, password);
  }

  static load({
    id,
    userId,
    password,
  }: {
    id: Id;
    userId: Id;
    password: string;
  }) {
    return new Credential(id, userId, password);
  }
}
