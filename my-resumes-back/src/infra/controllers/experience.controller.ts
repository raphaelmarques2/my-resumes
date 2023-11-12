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
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ExperienceDto } from 'src/domain/application/useCases/experience/dtos/ExperienceDto';
import { ExperienceUseCases } from 'src/domain/application/useCases/experience/ExperienceUseCases';
import { CreateExperienceDto } from '../../domain/application/useCases/experience/dtos/CreateExperienceDto';
import { UpdateExperienceDto } from 'src/domain/application/useCases/experience/dtos/UpdateExperienceDto';
import { AuthGuard } from '../guards/AuthGuard';

@ApiTags('experiences')
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
