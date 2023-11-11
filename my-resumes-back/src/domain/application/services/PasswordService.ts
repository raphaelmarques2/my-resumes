import * as bcrypt from 'bcrypt';

export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  async comparePasswords(
    inputPassword: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedPasswordHash);
  }
}
