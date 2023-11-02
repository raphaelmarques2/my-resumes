import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class App2Controller {
  constructor() {}

  @Get()
  @ApiOperation({ operationId: 'ok' })
  @ApiOkResponse({ type: String })
  ok(): string {
    return 'ok';
  }
}
