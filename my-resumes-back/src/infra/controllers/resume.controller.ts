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
import { ResumeUseCases } from 'src/domain/application/useCases/resume/ResumeUseCases';
import { CreateResumeDto } from 'src/domain/application/useCases/resume/dtos/CreateResumeDto';
import { ResumeDto } from 'src/domain/application/useCases/resume/dtos/ResumeDto';
import { UpdateResumeDto } from 'src/domain/application/useCases/resume/dtos/UpdateResumeDto';
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
