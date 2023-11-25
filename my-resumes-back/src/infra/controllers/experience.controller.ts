import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ExperienceUseCases } from 'src/modules/experience/old/ExperienceUseCases';
import { ExperienceDto } from 'src/modules/experience/entities/ExperienceDto';
import { UpdateExperienceDto } from 'src/modules/experience/use-cases/update-experience/UpdateExperienceDto';
import { CreateExperienceDto } from '../../modules/experience/use-cases/create-experience/CreateExperienceDto';
import { AuthGuard } from '../guards/AuthGuard';

@ApiTags('experiences')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class ExperienceController {
  constructor(private experienceService: ExperienceUseCases) {}

  @Post('/experiences')
  @ApiOperation({ operationId: 'createExperience' })
  @ApiCreatedResponse({ type: ExperienceDto })
  async createExperience(
    @Body() body: CreateExperienceDto,
  ): Promise<ExperienceDto> {
    return this.experienceService.createExperience(body);
  }

  @Get('/experiences/:id')
  @ApiOperation({ operationId: 'getExperience' })
  @ApiOkResponse({ type: ExperienceDto })
  async getExperience(@Param('id') id: string): Promise<ExperienceDto> {
    return this.experienceService.getExperienceById(id);
  }

  @Get('/users/:userId/experiences')
  @ApiOperation({ operationId: 'listUserExperiences' })
  @ApiOkResponse({ type: [ExperienceDto] })
  async listUserExperiences(
    @Param('userId') userId: string,
  ): Promise<ExperienceDto[]> {
    return this.experienceService.listUserExperiences(userId);
  }

  @Patch('/experiences/:id')
  @ApiOperation({
    operationId: 'patchExperience',
  })
  @ApiDefaultResponse({ type: ExperienceDto })
  async patchExperience(
    @Param('id') id: string,
    @Body() body: UpdateExperienceDto,
  ): Promise<ExperienceDto> {
    return this.experienceService.updateExperience(id, body);
  }

  @Delete('/experiences/:id')
  @ApiOperation({ operationId: 'deleteExperience' })
  async deleteExperience(@Param('id') id: string): Promise<void> {
    return this.experienceService.deleteExperience(id);
  }
}
