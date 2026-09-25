import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Domain, Level, Role } from '@repo/schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import type { AuthenticatedRequest } from 'src/auth/auth.guard';
import { DailyLessonService } from './daily-lesson.service';
import { TriggerDailyLessonGenerationDto } from './dto/trigger-generation.dto';

@ApiTags('Daily Lesson')
@Controller('daily-lesson')
export class DailyLessonController {
  constructor(private readonly dailyLessonService: DailyLessonService) {}

  @Post('generate')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary:
      'Trigger AI generation for daily lesson(s) by domain/level or all domains (Admin)',
  })
  async generate(@Body() dto?: TriggerDailyLessonGenerationDto) {
    return this.dailyLessonService.triggerGeneration(dto);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get daily lesson for the currently authenticated user',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    type: String,
    example: '2026-01-31',
    description:
      'Optional day to fetch (YYYY-MM-DD). Defaults to the current day. Past days are allowed; future days are rejected.',
  })
  async getDailyLessonForUser(
    @Req() req: AuthenticatedRequest,
    @Query('date') date?: string,
  ) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.dailyLessonService.getDailyLessonForUser(userId, date);
  }

  @Get('sequence')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get daily lesson by domain, level, and sequence number',
  })
  @ApiQuery({ name: 'domain', enum: Domain })
  @ApiQuery({ name: 'level', enum: Level })
  @ApiQuery({ name: 'sequenceNumber', type: Number, example: 1 })
  async findBySequence(
    @Req() req: AuthenticatedRequest,
    @Query('domain') domain: Domain,
    @Query('level') level: Level,
    @Query('sequenceNumber', ParseIntPipe) sequenceNumber: number,
  ) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (sequenceNumber < 1) {
      throw new NotFoundException('Daily lesson sequence must be at least 1');
    }

    const currentSequenceNumber =
      await this.dailyLessonService.getCurrentSequenceForUser(userId);

    if (sequenceNumber > currentSequenceNumber) {
      throw new ForbiddenException(
        'Future daily lessons are not available yet',
      );
    }

    return this.dailyLessonService.findBySequence(
      domain,
      level,
      sequenceNumber,
    );
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'List daily lessons with optional filter and pagination (Admin)',
  })
  @ApiQuery({ name: 'domain', enum: Domain, required: false })
  @ApiQuery({ name: 'level', enum: Level, required: false })
  @ApiQuery({ name: 'skip', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  async findAll(
    @Query('domain') domain?: Domain,
    @Query('level') level?: Level,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
  ) {
    const filter: Record<string, unknown> = {};
    if (domain) filter.domain = domain;
    if (level) filter.level = level;

    return this.dailyLessonService.findAll(filter, {
      skip: skip ? parseInt(skip, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get daily lesson by ID with populated data (Admin)',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Daily lesson document ID',
  })
  async findById(@Param('id') id: string) {
    return this.dailyLessonService.findById(id);
  }

  @Get(':id/vocabularies')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get populated vocabularies for a daily lesson' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Daily lesson document ID',
  })
  async getDailyVocabularies(@Param('id') id: string) {
    return this.dailyLessonService.getDailyVocabularies(id);
  }

  @Get(':id/sentences')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get populated sentences for a daily lesson' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Daily lesson document ID',
  })
  async getDailySentences(@Param('id') id: string) {
    return this.dailyLessonService.getDailySentences(id);
  }

  @Get(':id/articles')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get populated articles for a daily lesson' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Daily lesson document ID',
  })
  async getDailyArticles(@Param('id') id: string) {
    return this.dailyLessonService.getDailyArticles(id);
  }
}
