import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ operationId: 'ok' })
  @ApiOkResponse({ type: String })
  ok(): string {
    return 'ok';
  }
}
