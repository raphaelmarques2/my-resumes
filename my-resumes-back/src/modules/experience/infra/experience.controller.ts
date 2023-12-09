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
import { ExperienceDto } from 'src/modules/experience/application/entities/ExperienceDto';
import { UpdateExperienceDto } from 'src/modules/experience/application/use-cases/update-experience/UpdateExperienceDto';
import { CreateExperienceDto } from '../application/use-cases/create-experience/CreateExperienceDto';
import { AuthGuard } from '../../auth/infra/guards/AuthGuard';
import { CreateExperienceUseCase } from '../application/use-cases/create-experience/create-experience.usecase';
import { DeleteExperienceUseCase } from '../application/use-cases/delete-experience/delete-experience.usecase';
import { GetExperienceByIdUseCase } from '../application/use-cases/get-experience-by-id/get-experience-by-id.usecase';
import { ListUserExperiencesUseCase } from '../application/use-cases/list-user-experiences/list-user-experiences.usecase';
import { UpdateExperienceUseCase } from '../application/use-cases/update-experience/udpate-experience.usecase';

@ApiTags('experiences')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class ExperienceController {
  constructor(
    private createExperienceUseCase: CreateExperienceUseCase,
    private deleteExperienceUseCase: DeleteExperienceUseCase,
    private getExperienceByIdUseCase: GetExperienceByIdUseCase,
    private listUserExperiencesUseCase: ListUserExperiencesUseCase,
    private updateExperienceUseCase: UpdateExperienceUseCase,
  ) {}

  @Post('/experiences')
  @ApiOperation({ operationId: 'createExperience' })
  @ApiCreatedResponse({ type: ExperienceDto })
  async createExperience(
    @Body() body: CreateExperienceDto,
  ): Promise<ExperienceDto> {
    return this.createExperienceUseCase.execute(body);
  }

  @Get('/experiences/:id')
  @ApiOperation({ operationId: 'getExperience' })
  @ApiOkResponse({ type: ExperienceDto })
  async getExperience(@Param('id') id: string): Promise<ExperienceDto> {
    return this.getExperienceByIdUseCase.execute(id);
  }

  @Get('/users/:userId/experiences')
  @ApiOperation({ operationId: 'listUserExperiences' })
  @ApiOkResponse({ type: [ExperienceDto] })
  async listUserExperiences(
    @Param('userId') userId: string,
  ): Promise<ExperienceDto[]> {
    return this.listUserExperiencesUseCase.execute(userId);
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
    return this.updateExperienceUseCase.execute(id, body);
  }

  @Delete('/experiences/:id')
  @ApiOperation({ operationId: 'deleteExperience' })
  async deleteExperience(@Param('id') id: string): Promise<void> {
    return this.deleteExperienceUseCase.execute(id);
  }
}