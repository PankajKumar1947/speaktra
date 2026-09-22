import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Domain, Level } from '@repo/schema';
import { AIService } from '../ai/ai.service';
import { VocabularyService } from 'src/vocabulary/vocabulary.service';
import { SentenceService } from 'src/sentence/sentence.service';
import { ArticleService } from 'src/article/article.service';
import { UsersService } from 'src/users/users.service';
import { CreateVocabularyDto } from 'src/vocabulary/dto/create-vocabulary.dto';
import { CreateSentenceDto } from 'src/sentence/dto/create-sentence.dto';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { VocabularyDocument } from 'src/vocabulary/entities/vocabulary.entity';
import { SentenceDocument } from 'src/sentence/entities/sentence.entity';
import { ArticleDocument } from 'src/article/entities/article.entity';
import { DailyLessonDocument } from './entities/daily-lesson.entity';
import {
  DailyLessonFilter,
  DailyLessonRepository,
} from './daily-lesson.repository';
import { buildVocabularyPrompt } from './prompts/vocab.prompt';
import { buildSentencePrompt } from './prompts/sentence.prompt';
import { buildArticlePrompt } from './prompts/article.prompt';
import { CreateDailyLessonDto } from './dto/create-daily-lesson.dto';
import {
  GenerateVocabDto,
  GenerateSentenceDto,
  GenerateArticleDto,
  FindDailyLessonBySequenceDto,
} from './dto/generation.dto';

export type AIGeneratedVocab = Omit<CreateVocabularyDto, 'domain'>;
export type AIGeneratedSentence = Omit<CreateSentenceDto, 'domain'>;
export type AIGeneratedArticle = Omit<CreateArticleDto, 'domain'>;

@Injectable()
export class DailyLessonService {
  private readonly logger = new Logger(DailyLessonService.name);

  constructor(
    private readonly dailyLessonRepository: DailyLessonRepository,
    private readonly aiService: AIService,
    private readonly vocabularyService: VocabularyService,
    private readonly sentenceService: SentenceService,
    private readonly articleService: ArticleService,
    private readonly usersService: UsersService,
  ) {}

  async generateVocab(dto: GenerateVocabDto): Promise<CreateVocabularyDto[]> {
    const prompt = buildVocabularyPrompt({
      domainName: dto.domain,
      level: dto.level,
      theme: dto.theme,
      words: dto.words,
    });
    const result = await this.aiService.completeJson({
      systemPrompt: prompt,
    });
    const vocabularies: AIGeneratedVocab[] = Array.isArray(result)
      ? result
      : result.vocabularies || result.vocabulary || result.words || [];
    return vocabularies.map((v) => ({
      ...v,
      domain: dto.domain,
    }));
  }

  async saveVocabsToDatabase(
    vocabularies: CreateVocabularyDto[],
  ): Promise<VocabularyDocument[]> {
    return this.vocabularyService.createMany(vocabularies);
  }

  async generateSentence(
    dto: GenerateSentenceDto,
  ): Promise<CreateSentenceDto[]> {
    const prompt = buildSentencePrompt({
      domainName: dto.domain,
      level: dto.level,
      theme: dto.theme,
      vocabularyWords: dto.vocabularyWords,
      count: dto.count,
    });
    const result = await this.aiService.completeJson({
      systemPrompt: prompt,
    });
    const sentences: AIGeneratedSentence[] = Array.isArray(result)
      ? result
      : result.sentences || result.sentence || [];
    return sentences.map((s) => ({
      ...s,
      domain: dto.domain,
    }));
  }

  async saveSentencesToDatabase(
    sentences: CreateSentenceDto[],
  ): Promise<SentenceDocument[]> {
    return this.sentenceService.createMany(sentences);
  }

  async generateArticle(dto: GenerateArticleDto): Promise<CreateArticleDto[]> {
    const prompt = buildArticlePrompt({
      domainName: dto.domain,
      level: dto.level,
      theme: dto.theme,
      vocabularyWords: dto.vocabularyWords,
      count: dto.count,
    });
    const result = await this.aiService.completeJson({
      systemPrompt: prompt,
    });
    const articles: AIGeneratedArticle[] = Array.isArray(result)
      ? result
      : result.articles || result.article || [];
    return articles.map((a) => ({
      ...a,
      domain: dto.domain,
    }));
  }

  async saveArticlesToDatabase(
    articles: CreateArticleDto[],
  ): Promise<ArticleDocument[]> {
    return this.articleService.createMany(articles);
  }

  async saveDailyLesson(
    dto: CreateDailyLessonDto,
  ): Promise<DailyLessonDocument> {
    return this.dailyLessonRepository.upsert(dto);
  }

  async findBySequence(
    queryOrDomain: FindDailyLessonBySequenceDto | Domain,
    level?: Level,
    sequenceNumber?: number,
  ) {
    const domain =
      typeof queryOrDomain === 'object' ? queryOrDomain.domain : queryOrDomain;
    const resolvedLevel =
      typeof queryOrDomain === 'object' ? queryOrDomain.level : level!;
    const seq =
      typeof queryOrDomain === 'object'
        ? queryOrDomain.sequenceNumber
        : sequenceNumber!;

    const lesson = await this.dailyLessonRepository.findBySequence(
      domain,
      resolvedLevel,
      seq,
    );

    if (!lesson) {
      throw new NotFoundException(
        `Daily lesson for ${domain}/${resolvedLevel} (day ${seq}) not found`,
      );
    }

    return lesson;
  }

  async getDailyLessonForUser(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.domain || !user.level) {
      throw new NotFoundException('User not found or onboarding not completed');
    }

    const sequenceNumber =
      Math.floor(
        (Date.now() - new Date(user.createdAt).getTime()) /
          (1000 * 60 * 60 * 24),
      ) + 1;

    this.logger.log(
      `Fetching daily lesson for user ${user.name} (${user.domain}/${user.level}, day ${sequenceNumber})`,
    );

    return this.findBySequence(user.domain, user.level, sequenceNumber);
  }

  async findAll(
    filter?: DailyLessonFilter,
    options?: { skip?: number; limit?: number },
  ) {
    return this.dailyLessonRepository.findAll(filter, options);
  }

  async findById(id: string) {
    const lesson = await this.dailyLessonRepository.findById(id);
    if (!lesson) {
      throw new NotFoundException(`Daily lesson with id "${id}" not found`);
    }
    return lesson;
  }

  async exists(
    domain: Domain,
    level: Level,
    sequenceNumber: number,
  ): Promise<boolean> {
    return this.dailyLessonRepository.exists(domain, level, sequenceNumber);
  }

  async getDailyVocabularies(dailyLessonId: string) {
    const lesson = await this.dailyLessonRepository.findById(dailyLessonId);
    return lesson?.vocabularies ?? [];
  }

  async getDailySentences(dailyLessonId: string) {
    const lesson = await this.dailyLessonRepository.findById(dailyLessonId);
    return lesson?.sentences ?? [];
  }

  async getDailyArticles(dailyLessonId: string) {
    const lesson = await this.dailyLessonRepository.findById(dailyLessonId);
    return lesson?.articles ?? [];
  }
}
