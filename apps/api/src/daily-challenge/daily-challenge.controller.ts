import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { DailyChallengeService } from './daily-challenge.service';
import { CreateDailyChallengeDto } from './dto/create-daily-challenge.dto';
import { UpdateDailyChallengeDto } from './dto/update-daily-challenge.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { Request } from 'express';

@Controller('daily-challenge')
export class DailyChallengeController {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  @Post()
  create(@Body() createDailyChallengeDto: CreateDailyChallengeDto) {
    return this.dailyChallengeService.create(createDailyChallengeDto);
  }

  @Get()
  findAll() {
    return this.dailyChallengeService.findAll();
  }

  @Get('user')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  getDailyChallengeForUser(@Req() req: Request) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new Error('User not found');
    }
    return this.dailyChallengeService.getDailyChallengeForUser(userId);
  }

  @Get(':id/vocabularies')
  getDailyVocabularies(@Param('id') id: string) {
    return this.dailyChallengeService.getDailyVocabularies(id);
  }

  @Get(':id/sentences')
  getDailySentences(@Param('id') id: string) {
    return this.dailyChallengeService.getDailySentences(id);
  }

  @Get(':id/articles')
  getDailyArticles(@Param('id') id: string) {
    return this.dailyChallengeService.getDailyArticles(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyChallengeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDailyChallengeDto: UpdateDailyChallengeDto,
  ) {
    return this.dailyChallengeService.update(id, updateDailyChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyChallengeService.remove(id);
  }
}
