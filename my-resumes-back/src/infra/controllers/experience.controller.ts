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
import { ExperienceDto } from 'src/domain/application/dtos/ExperienceDto';
import { ExperienceUseCases } from 'src/domain/application/useCases/ExperienceUseCases';
import { CreateExperienceDto } from '../../domain/application/dtos/CreateExperienceDto';
import { UpdateExperienceDto } from 'src/domain/application/dtos/UpdateExperienceDto';
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
    return this.experienceService.create(body);
  }

  @Get('/experiences/:id')
  @ApiOperation({ operationId: 'getExperience' })
  @ApiOkResponse({ type: ExperienceDto })
  async getExperience(@Param('id') id: string): Promise<ExperienceDto> {
    return this.experienceService.findById(id);
  }

  @Get('/users/:userId/experiences')
  @ApiOperation({ operationId: 'listUserExperiences' })
  @ApiOkResponse({ type: [ExperienceDto] })
  async listUserExperiences(
    @Param('userId') userId: string,
  ): Promise<ExperienceDto[]> {
    return this.experienceService.listByUserId(userId);
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
    return this.experienceService.update(id, body);
  }

  @Delete('/experiences/:id')
  @ApiOperation({ operationId: 'deleteExperience' })
  async deleteExperience(@Param('id') id: string): Promise<void> {
    return this.experienceService.delete(id);
  }
}
