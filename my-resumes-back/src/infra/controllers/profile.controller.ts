import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProfileDto } from 'src/domain/application/dtos/CreateProfileDto';
import { ProfileDto } from 'src/domain/application/dtos/ProfileDto';
import { UpdateProfileDto } from 'src/domain/application/dtos/UpdateProfileDto';
import { ProfileService } from 'src/domain/application/services/ProfileService';
import { AuthGuard } from '../guards/AuthGuard';

@ApiTags('profiles')
@UseGuards(AuthGuard)
@Controller()
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('/profiles')
  @ApiOperation({ operationId: 'createProfile' })
  @ApiCreatedResponse({ type: ProfileDto })
  async createProfile(@Body() body: CreateProfileDto): Promise<ProfileDto> {
    return this.profileService.create(body);
  }

  @Get('/profiles/:id')
  @ApiOperation({ operationId: 'getProfileById' })
  @ApiOkResponse({ type: ProfileDto })
  async getById(@Param('id') id: string): Promise<ProfileDto> {
    return this.profileService.findById(id);
  }

  @Get('/users/:userId/profile')
  @ApiOperation({ operationId: 'getProfileByUserId' })
  @ApiOkResponse({ type: ProfileDto })
  async getProfileByUserId(
    @Param('userId') userId: string,
  ): Promise<ProfileDto> {
    return this.profileService.findByUserId(userId);
  }

  @Patch('/profiles/:id')
  @ApiOperation({ operationId: 'patchProfile' })
  @ApiOkResponse({ type: ProfileDto })
  async patch(
    @Param('id') id: string,
    @Body() body: UpdateProfileDto,
  ): Promise<ProfileDto> {
    return this.profileService.update(id, body);
  }
}
