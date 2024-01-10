import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Transaction } from 'src/modules/common/application/repositories/TransactionService';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(options?: { url?: string }) {
    if (options?.url) {
      super({ datasources: { db: { url: options.url } } });
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
