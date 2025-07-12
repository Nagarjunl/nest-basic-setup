import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private readonly saltRounds = 10;

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }

  async hashPassword(password: string): Promise<string> {
    return this.hash(password);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return this.compare(password, hashedPassword);
  }
} 