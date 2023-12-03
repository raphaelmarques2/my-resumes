import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestPasswordResetUseCase } from '../../application/use-cases/request-password-reset/request-password-reset.usecase';
import { UpdatePasswordByResetTokenUseCase } from '../../application/use-cases/update-password-by-reset-token/update-password-by-reset-token.usecase';
import { ValidatePasswordResetTokenUseCase } from '../../application/use-cases/validate-password-reset-token/validate-password-reset-token.usecase';
import { RequestPasswordResetDto } from '../../application/use-cases/request-password-reset/request-password-reset.dto';
import { UserDto } from '../../application/entities/User.dto';

@ApiTags('updatePasswordPequest')
@Controller('/auth/update-password-request')
export class UpdatePasswordRequestController {
  constructor(
    private requestPasswordResetUseCase: RequestPasswordResetUseCase,
    private validatePasswordResetTokenUseCase: ValidatePasswordResetTokenUseCase,
    private updatePasswordByResetTokenUseCase: UpdatePasswordByResetTokenUseCase,
  ) {}

  @Post('')
  async requestPasswordReset(
    @Body() body: RequestPasswordResetDto,
  ): Promise<void> {
    await this.requestPasswordResetUseCase.execute(body);
  }

  @Get('/:token')
  async validatePasswordResetToken(
    @Param('token') token: string,
  ): Promise<UserDto> {
    return await this.validatePasswordResetTokenUseCase.execute(token);
  }

  @Post('/:token/update-password')
  async updatePasswordByResetToken(
    @Param('token') token: string,
    @Body('password') password: string,
  ): Promise<void> {
    await this.updatePasswordByResetTokenUseCase.execute({
      token,
      password: password,
    });
  }
}
