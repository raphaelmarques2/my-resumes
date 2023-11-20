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
import { EducationUseCases } from 'src/domain/application/useCases/education/EducationUseCases';
import { EducationDto } from 'src/domain/application/useCases/education/dtos/EducationDto';
import { UpdateEducationDto } from 'src/domain/application/useCases/education/dtos/UpdateEducationDto';
import { CreateEducationDto } from '../../domain/application/useCases/education/dtos/CreateEducationDto';
import { AuthGuard } from '../guards/AuthGuard';

@ApiTags('educations')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class EducationController {
  constructor(private educationService: EducationUseCases) {}

  @Post('/educations')
  @ApiOperation({ operationId: 'createEducation' })
  @ApiCreatedResponse({ type: EducationDto })
  async createEducation(
    @Body() body: CreateEducationDto,
  ): Promise<EducationDto> {
    return this.educationService.createEducation(body);
  }

  @Get('/educations/:id')
  @ApiOperation({ operationId: 'getEducation' })
  @ApiOkResponse({ type: EducationDto })
  async getEducation(@Param('id') id: string): Promise<EducationDto> {
    return this.educationService.getEducationById(id);
  }

  @Get('/users/:userId/educations')
  @ApiOperation({ operationId: 'listUserEducations' })
  @ApiOkResponse({ type: [EducationDto] })
  async listUserEducations(
    @Param('userId') userId: string,
  ): Promise<EducationDto[]> {
    return this.educationService.listUserEducations(userId);
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
    return this.educationService.updateEducation(id, body);
  }

  @Delete('/educations/:id')
  @ApiOperation({ operationId: 'deleteEducation' })
  async deleteEducation(@Param('id') id: string): Promise<void> {
    return this.educationService.deleteEducation(id);
  }
}
