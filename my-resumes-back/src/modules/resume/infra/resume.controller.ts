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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateResumeDto } from 'src/modules/resume/application/use-cases/create-resume/CreateResumeDto';
import { ResumeDto } from 'src/modules/resume/application/entities/ResumeDto';
import { UpdateResumeDto } from 'src/modules/resume/application/use-cases/update-resume/UpdateResumeDto';
import { AuthGuard } from '../../auth/infra/guards/AuthGuard';
import { CreateResumeUseCase } from '../application/use-cases/create-resume/create-resume.usecase';
import { DeleteResumeUseCase } from '../application/use-cases/delete-resume/delete-resume.usecase';
import { GetResumeByIdUseCase } from '../application/use-cases/get-resume-by-id/get-resume-by-id.usecase';
import { ListUserResumesUseCase } from '../application/use-cases/list-user-resumes/list-user-resumes.usecase';
import { UpdateResumeUseCase } from '../application/use-cases/update-resume/update-resume.usecase';

@ApiTags('resumes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class ResumeController {
  constructor(
    private createResumeUseCase: CreateResumeUseCase,
    private deleteResumeUseCase: DeleteResumeUseCase,
    private getResumeByIdUseCase: GetResumeByIdUseCase,
    private listUserResumesUseCase: ListUserResumesUseCase,
    private updateResumeUseCase: UpdateResumeUseCase,
  ) {}

  @Post('/resumes')
  @ApiOperation({ operationId: 'createResume' })
  @ApiCreatedResponse({ type: ResumeDto })
  async createResume(@Body() body: CreateResumeDto): Promise<ResumeDto> {
    return this.createResumeUseCase.execute(body);
  }

  @Get('/resumes/:id')
  @ApiOperation({ operationId: 'getResumeById' })
  @ApiOkResponse({ type: ResumeDto })
  async getById(@Param('id') id: string): Promise<ResumeDto> {
    return this.getResumeByIdUseCase.execute(id);
  }

  @Get('/users/:userId/resumes')
  @ApiOperation({ operationId: 'listUserResumes' })
  @ApiOkResponse({ type: [ResumeDto] })
  async listUserResumes(@Param('userId') userId: string): Promise<ResumeDto[]> {
    return this.listUserResumesUseCase.execute(userId);
  }

  @Patch('/resumes/:id')
  @ApiOperation({ operationId: 'patchResume' })
  @ApiOkResponse({ type: ResumeDto })
  async patch(
    @Param('id') id: string,
    @Body() body: UpdateResumeDto,
  ): Promise<ResumeDto> {
    return this.updateResumeUseCase.execute(id, body);
  }

  @Delete('/resumes/:id')
  @ApiOperation({ operationId: 'deleteResume' })
  @ApiCreatedResponse()
  async deleteResume(@Param('id') id: string): Promise<void> {
    return this.deleteResumeUseCase.execute(id);
  }
}