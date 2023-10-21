import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateResumeDto } from 'src/domain/application/dtos/CreateResumeDto';
import { ResumeDto } from 'src/domain/application/dtos/ResumeDto';
import { UpdateResumeDto } from 'src/domain/application/dtos/UpdateResumeDto';
import { ResumeService } from 'src/domain/application/services/ResumeService';
import { AuthGuard } from '../guards/AuthGuard';

@ApiTags('resumes')
@UseGuards(AuthGuard)
@Controller()
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Post('/resumes')
  @ApiOperation({ operationId: 'createResume' })
  @ApiCreatedResponse({ type: ResumeDto })
  async createResume(@Body() body: CreateResumeDto): Promise<ResumeDto> {
    return this.resumeService.create(body);
  }

  @Get('/resumes/:id')
  @ApiOperation({ operationId: 'getResumeById' })
  @ApiOkResponse({ type: ResumeDto })
  async getById(@Param('id') id: string): Promise<ResumeDto> {
    return this.resumeService.findById(id);
  }

  @Get('/users/:userId/resumes')
  @ApiOperation({ operationId: 'listUserResumes' })
  @ApiOkResponse({ type: [ResumeDto] })
  async listUserResumes(@Param('userId') userId: string): Promise<ResumeDto[]> {
    return this.resumeService.listByUserId(userId);
  }

  @Patch('/resumes/:id')
  @ApiOperation({ operationId: 'patchResume' })
  @ApiOkResponse({ type: ResumeDto })
  async patch(
    @Param('id') id: string,
    @Body() body: UpdateResumeDto,
  ): Promise<ResumeDto> {
    return this.resumeService.update(id, body);
  }

  @Post('/resumes/:id/experiences')
  @ApiOperation({ operationId: 'addExperienceToResume' })
  @ApiCreatedResponse()
  async addExperience(
    @Param('id') id: string,
    @Body() body: { experienceId: string },
  ): Promise<void> {
    return this.resumeService.addExperience(id, body.experienceId);
  }

  @Delete('/resumes/:id/experiences/:experienceId')
  @ApiOperation({ operationId: 'removeExperienceFromResume' })
  @ApiCreatedResponse()
  async removeExperience(
    @Param('id') id: string,
    @Param('experienceId') experienceId: string,
  ): Promise<void> {
    return this.resumeService.removeExperience(id, experienceId);
  }

  @Delete('/resumes/:id')
  @ApiOperation({ operationId: 'deleteResume' })
  @ApiCreatedResponse()
  async deleteResume(@Param('id') id: string): Promise<void> {
    return this.resumeService.deleteResume(id);
  }
}
