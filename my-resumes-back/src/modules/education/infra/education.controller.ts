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
import { AuthGuard } from '../../auth/infra/guards/AuthGuard';
import { CreateEducationUseCase } from '../application/use-cases/create-education/create-education.usecase';
import { DeleteEducationUseCase } from '../application/use-cases/delete-education/delete-education.usecase';
import { GetEducationByIdUseCase } from '../application/use-cases/get-education-by-id/get-education-by-id.usecase';
import { ListUserEducationsUseCase } from '../application/use-cases/list-user-educations/list-user-educations.usecase';
import { UpdateEducationUseCase } from '../application/use-cases/update-education/update-education.usecase';
import { EducationDto } from '../application/entities/EducationDto';
import { CreateEducationDto } from '../application/use-cases/create-education/CreateEducationDto';
import { UpdateEducationDto } from '../application/use-cases/update-education/UpdateEducationDto';

@ApiTags('educations')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class EducationController {
  constructor(
    private createEducationUseCase: CreateEducationUseCase,
    private deleteEducationUseCase: DeleteEducationUseCase,
    private getEducationByIdUseCase: GetEducationByIdUseCase,
    private listUserEducationsUseCase: ListUserEducationsUseCase,
    private updateEducationUseCase: UpdateEducationUseCase,
  ) {}

  @Post('/educations')
  @ApiOperation({ operationId: 'createEducation' })
  @ApiCreatedResponse({ type: EducationDto })
  async createEducation(
    @Body() body: CreateEducationDto,
  ): Promise<EducationDto> {
    return this.createEducationUseCase.execute(body);
  }

  @Get('/educations/:id')
  @ApiOperation({ operationId: 'getEducation' })
  @ApiOkResponse({ type: EducationDto })
  async getEducation(@Param('id') id: string): Promise<EducationDto> {
    return this.getEducationByIdUseCase.execute(id);
  }

  @Get('/users/:userId/educations')
  @ApiOperation({ operationId: 'listUserEducations' })
  @ApiOkResponse({ type: [EducationDto] })
  async listUserEducations(
    @Param('userId') userId: string,
  ): Promise<EducationDto[]> {
    return this.listUserEducationsUseCase.execute(userId);
  }

  @Patch('/educations/:id')
  @ApiOperation({
    operationId: 'patchEducation',
  })
  @ApiDefaultResponse({ type: EducationDto })
  async patchEducation(
    @Param('id') id: string,
    @Body() body: UpdateEducationDto,
  ): Promise<EducationDto> {
    return this.updateEducationUseCase.execute(id, body);
  }

  @Delete('/educations/:id')
  @ApiOperation({ operationId: 'deleteEducation' })
  async deleteEducation(@Param('id') id: string): Promise<void> {
    return this.deleteEducationUseCase.execute(id);
  }
}
