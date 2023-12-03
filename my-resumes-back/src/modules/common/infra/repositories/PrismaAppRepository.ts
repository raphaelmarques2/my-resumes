import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/common/infra/services/PrismaService';
import {
  Transaction,
  TransactionService,
} from '../../application/repositories/TransactionService';

@Injectable()
export class PrismaTransactionService implements TransactionService {
  constructor(private prismaService: PrismaService) {}

  async transaction<T>(
    fn: (transaction: Transaction) => Promise<T>,
  ): Promise<T> {
    return await this.prismaService.$transaction(async (prisma) => {
      return await fn(prisma);
    });
  }
}
