import { Injectable, InternalServerErrorException } from '@nestjs/common';

export const configurations = () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  },
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
  get database() {
    return {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    };
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
    if (!this.database.host) {
      throw new InternalServerErrorException('Missing env.DATABASE_HOST');
    }
    if (!this.database.host) {
      throw new InternalServerErrorException('Missing env.DATABASE_PORT');
    }
    if (!this.jwtSecret) {
      throw new InternalServerErrorException('Missing env.JWT_SECRET');
    }
  }
}
