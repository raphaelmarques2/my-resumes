import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthOutputDto } from 'src/domain/application/useCases/auth/dtos/AuthOutputDto';
import { LoginDto } from 'src/domain/application/useCases/auth/dtos/LoginDto';
import { SignupDto } from 'src/domain/application/useCases/auth/dtos/SignupDto';
import { AuthUseCases } from '../../domain/application/useCases/auth/AuthUseCases';
import { UserDto } from 'src/domain/application/useCases/user/dtos/UserDto';
import { AuthGuard } from '../guards/AuthGuard';
import { Request } from 'express';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthUseCases) {}

  @Post('/signup')
  @ApiOperation({ operationId: 'signup' })
  @ApiCreatedResponse({ type: AuthOutputDto })
  async signup(@Body() body: SignupDto): Promise<AuthOutputDto> {
    return this.authService.signup(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiOperation({ operationId: 'login' })
  @ApiCreatedResponse({ type: AuthOutputDto })
  async login(@Body() body: LoginDto): Promise<AuthOutputDto> {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Post('/authenticate')
  @ApiOperation({ operationId: 'authenticate' })
  @ApiCreatedResponse({ type: AuthOutputDto })
  async authenticate(@Req() req: Request): Promise<AuthOutputDto> {
    const [, token] = req.headers.authorization?.split(' ') ?? [];
    return this.authService.authenticate(token);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  @ApiOperation({ operationId: 'getMe' })
  @ApiOkResponse({ type: UserDto })
  async getMe(@Req() req: Request) {
    const auth = req['auth'] as AuthOutputDto | undefined;
    if (!auth) {
      throw new UnauthorizedException();
    }
    return auth.user;
  }
}
