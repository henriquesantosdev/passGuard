import { HashingServiceProtocol } from './hashing.service';
import * as bcrypt from 'bcrypt';

export class BcryptService extends HashingServiceProtocol {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = bcrypt.hash(password, salt);
    return hash;
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    const passwordCompared = bcrypt.compare(password, passwordHash);
    return passwordCompared;
  }
}
