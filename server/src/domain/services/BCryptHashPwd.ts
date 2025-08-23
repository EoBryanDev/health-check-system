import bcrypt from 'bcrypt';
import { IHashPassword } from './interfaces/IHashPassword';

class BCryptHashPwd implements IHashPassword {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}

export { BCryptHashPwd };
