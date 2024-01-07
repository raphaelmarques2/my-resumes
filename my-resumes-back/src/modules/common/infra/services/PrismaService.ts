import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Transaction } from 'src/modules/common/application/repositories/TransactionService';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const isJest = Boolean(process.env.JEST_WORKER_ID);
    if (isJest) {
      console.log(`new PrismaService(${process.env.TEST_DATABASE_URL}) [JEST]`);
      super({ datasources: { db: { url: process.env.TEST_DATABASE_URL } } });
    } else {
      super();
    }
  }

  or(transaction?: Transaction): PrismaService {
    if (transaction && !(transaction instanceof PrismaClient)) {
      throw new Error('Transaction should be a PrismaClient instance');
    }
    return (transaction as PrismaService) || this;
  }
}
