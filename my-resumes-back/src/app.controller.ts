import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from './domain/application/services/PrismaService';
import { MyConfigService } from './infra/services/MyConfigService';

@Controller()
export class AppController {
  constructor(
    private config: MyConfigService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @ApiOperation({ operationId: 'ok' })
  @ApiOkResponse({ type: String })
  ok(): string {
    return 'ok';
  }

  @Get('/health')
  @ApiOperation({ operationId: 'ok' })
  @ApiOkResponse({ type: String })
  async health() {
    this.config.validate();
    await this.prisma.user.count();
    return 'ok';
  }
}
