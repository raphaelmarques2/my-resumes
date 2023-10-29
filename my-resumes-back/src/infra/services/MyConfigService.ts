import { Injectable, InternalServerErrorException } from '@nestjs/common';

export const configurations = () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || '',
  populateDb: Boolean(process.env.POPULATE_DB),
  logDb: Boolean(process.env.LOG_DB),
});

export type ConfigData = ReturnType<typeof configurations>;

@Injectable()
export class MyConfigService {
  constructor() {}

  get port() {
    return parseInt(process.env.PORT ?? '3000', 10);
  }
  get databaseUrl() {
    return process.env.DATABASE_URL || '';
  }
  get jwtSecret() {
    return process.env.JWT_SECRET || 'abc';
  }
  get populateDb() {
    return Boolean(process.env.POPULATE_DB);
  }
  get logDb() {
    return Boolean(process.env.LOG_DB);
  }

  validate() {
    if (!this.port) {
      throw new InternalServerErrorException('Missing env.PORT');
    }
    if (!this.databaseUrl) {
      throw new InternalServerErrorException('Missing env.DATABASE_URL');
    }
    if (!this.jwtSecret) {
      throw new InternalServerErrorException('Missing env.JWT_SECRET');
    }
  }
}
