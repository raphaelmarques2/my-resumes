import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ProfileUseCases } from 'src/domain/application/useCases/profile/ProfileUseCases';
import { ProfileDto } from 'src/domain/application/useCases/profile/dtos/ProfileDto';
import { UpdateProfileDto } from 'src/domain/application/useCases/profile/dtos/UpdateProfileDto';
import { AuthGuard } from '../guards/AuthGuard';

@ApiTags('profiles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class ProfileController {
  constructor(private profileService: ProfileUseCases) {}

  @Get('/profiles/:id')
  @ApiOperation({ operationId: 'getProfileById' })
  @ApiOkResponse({ type: ProfileDto })
  async getById(@Param('id') id: string): Promise<ProfileDto> {
    return this.profileService.getProfileById(id);
  }

  @Get('/users/:userId/profile')
  @ApiOperation({ operationId: 'getProfileByUserId' })
  @ApiOkResponse({ type: ProfileDto })
  async getProfileByUserId(
    @Param('userId') userId: string,
  ): Promise<ProfileDto> {
    return this.profileService.getUserProfile(userId);
  }

  @Patch('/profiles/:id')
  @ApiOperation({ operationId: 'patchProfile' })
  @ApiOkResponse({ type: ProfileDto })
  async patch(
    @Param('id') id: string,
    @Body() body: UpdateProfileDto,
  ): Promise<ProfileDto> {
    return this.profileService.updateProfile(id, body);
  }
}
