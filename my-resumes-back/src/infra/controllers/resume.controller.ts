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
import { ResumeUseCases } from 'src/modules/resume/use-cases/create-resume/create-resume.usecase';
import { CreateResumeDto } from 'src/modules/resume/use-cases/create-resume/CreateResumeDto';
import { ResumeDto } from 'src/modules/resume/entities/ResumeDto';
import { UpdateResumeDto } from 'src/modules/resume/use-cases/update-resume/UpdateResumeDto';
import { AuthGuard } from '../guards/AuthGuard';

@ApiTags('resumes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class ResumeController {
  constructor(private resumeService: ResumeUseCases) {}

  @Post('/resumes')
  @ApiOperation({ operationId: 'createResume' })
  @ApiCreatedResponse({ type: ResumeDto })
  async createResume(@Body() body: CreateResumeDto): Promise<ResumeDto> {
    return this.resumeService.createResume(body);
  }

  @Get('/resumes/:id')
  @ApiOperation({ operationId: 'getResumeById' })
  @ApiOkResponse({ type: ResumeDto })
  async getById(@Param('id') id: string): Promise<ResumeDto> {
    return this.resumeService.getResumeById(id);
  }

  @Get('/users/:userId/resumes')
  @ApiOperation({ operationId: 'listUserResumes' })
  @ApiOkResponse({ type: [ResumeDto] })
  async listUserResumes(@Param('userId') userId: string): Promise<ResumeDto[]> {
    return this.resumeService.listUserResumes(userId);
  }

  @Patch('/resumes/:id')
  @ApiOperation({ operationId: 'patchResume' })
  @ApiOkResponse({ type: ResumeDto })
  async patch(
    @Param('id') id: string,
    @Body() body: UpdateResumeDto,
  ): Promise<ResumeDto> {
    return this.resumeService.updateResume(id, body);
  }

  @Delete('/resumes/:id')
  @ApiOperation({ operationId: 'deleteResume' })
  @ApiCreatedResponse()
  async deleteResume(@Param('id') id: string): Promise<void> {
    return this.resumeService.deleteResume(id);
  }
}
