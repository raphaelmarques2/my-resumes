import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Transaction } from 'src/modules/common/application/repositories/TransactionService';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
    // console.log(`new PrismaService()`);
  }

  or(transaction?: Transaction): PrismaService {
    if (transaction && !(transaction instanceof PrismaClient)) {
      throw new Error('Transaction should be a PrismaClient instance');
    }
    return (transaction as PrismaService) || this;
  }
}
