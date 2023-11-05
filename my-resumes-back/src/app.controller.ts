import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UserRepository } from './domain/application/repositories/UserRepository';
import { MyConfigService } from './infra/services/MyConfigService';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: MyConfigService,
    private readonly user: UserRepository,
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
    await this.user.count();
    return 'ok';
  }
}
