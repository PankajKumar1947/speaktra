import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Domain, Level } from '@repo/schema';
import { AIService } from '../ai/ai.service';
import { VocabularyService } from 'src/vocabulary/vocabulary.service';
import { SentenceService } from 'src/sentence/sentence.service';
import { ArticleService } from 'src/article/article.service';
import { UsersService } from 'src/users/users.service';
import { DomainService } from 'src/domain/domain.service';
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
import { inngest } from '../inngest/client';
import { TriggerDailyLessonGenerationDto } from './dto/trigger-generation.dto';
import {
  AIGenerateVocabResponseSchema,
  AIGenerateSentenceResponseSchema,
  AIGenerateArticleResponseSchema,
  AIVocabJsonSchema,
  AISentenceJsonSchema,
  AIArticleJsonSchema,
} from './schemas/ai-response.schema';

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
    private readonly domainService: DomainService,
  ) {}

  async getAllDomains(): Promise<Domain[]> {
    try {
      const items = await this.domainService.findAll();
      if (items?.length) {
        return items.map((item) => item.id);
      }
    } catch (error) {
      this.logger.warn(
        `Failed to fetch domains from speaktra-content, using fallback: ${String(error)}`,
      );
    }
    return Object.values(Domain);
  }

  async getLatestSequenceNumber(domain: Domain, level: Level): Promise<number> {
    return this.dailyLessonRepository.getLatestSequenceNumber(domain, level);
  }

  async generateVocab(dto: GenerateVocabDto): Promise<CreateVocabularyDto[]> {
    if (!dto.words || dto.words.length === 0) {
      this.logger.warn(
        `No words provided for vocab generation for ${dto.domain} (${dto.level})`,
      );
      return [];
    }

    const prompt = buildVocabularyPrompt({
      domainName: dto.domain,
      level: dto.level,
      theme: dto.theme,
      words: dto.words,
    });
    const rawResult: unknown = await this.aiService.completeJson({
      systemPrompt: prompt,
      jsonSchema: AIVocabJsonSchema,
    });
    const parsed = AIGenerateVocabResponseSchema.safeParse(rawResult);

    if (!parsed.success) {
      this.logger.error(
        `AI vocab generation validation failed for ${dto.domain} (${dto.level}): ${parsed.error.message}`,
      );
      return [];
    }

    // Difficulty is authoritative from the word bank — never trust the AI's
    // value. Drop any off-list (hallucinated) words to keep delivery deterministic.
    const difficultyByWord = new Map(
      dto.words.map((w) => [w.word.trim().toLowerCase(), w.difficulty]),
    );

    return parsed.data.vocabularies.flatMap((v) => {
      const word = v.word.trim();
      const difficulty = difficultyByWord.get(word.toLowerCase());
      if (!difficulty) {
        this.logger.warn(
          `AI returned off-list word "${word}" for ${dto.domain} (${dto.level}, theme "${dto.theme ?? 'n/a'}"); dropping it`,
        );
        return [];
      }
      return [{ ...v, word, difficulty, domain: dto.domain }];
    });
  }

  async saveVocabsToDatabase(
    vocabularies: CreateVocabularyDto[],
  ): Promise<VocabularyDocument[]> {
    if (!vocabularies || vocabularies.length === 0) {
      return [];
    }
    return this.vocabularyService.createMany(vocabularies);
  }

  async generateSentence(
    dto: GenerateSentenceDto,
  ): Promise<CreateSentenceDto[]> {
    if (!dto.vocabularyWords || dto.vocabularyWords.length === 0) {
      this.logger.warn(
        `No vocabulary words provided for sentence generation for ${dto.domain} (${dto.level})`,
      );
      return [];
    }

    const prompt = buildSentencePrompt({
      domainName: dto.domain,
      level: dto.level,
      theme: dto.theme,
      vocabularyWords: dto.vocabularyWords,
      count: dto.count,
    });
    const rawResult: unknown = await this.aiService.completeJson({
      systemPrompt: prompt,
      jsonSchema: AISentenceJsonSchema,
    });
    const parsed = AIGenerateSentenceResponseSchema.safeParse(rawResult);

    if (!parsed.success) {
      this.logger.error(
        `AI sentence generation validation failed for ${dto.domain} (${dto.level}): ${parsed.error.message}`,
      );
      return [];
    }

    return parsed.data.sentences.map((s) => ({
      ...s,
      sentence: s.sentence.trim(),
      domain: dto.domain,
    }));
  }

  async saveSentencesToDatabase(
    sentences: CreateSentenceDto[],
  ): Promise<SentenceDocument[]> {
    if (!sentences || sentences.length === 0) {
      return [];
    }
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
    const rawResult: unknown = await this.aiService.completeJson({
      systemPrompt: prompt,
      jsonSchema: AIArticleJsonSchema,
    });
    const parsed = AIGenerateArticleResponseSchema.safeParse(rawResult);

    if (!parsed.success) {
      this.logger.error(
        `AI article generation validation failed for ${dto.domain} (${dto.level}): ${parsed.error.message}`,
      );
      return [];
    }

    return parsed.data.articles.map((a) => ({
      ...a,
      title: a.title.trim(),
      domain: dto.domain,
    }));
  }

  async saveArticlesToDatabase(
    articles: CreateArticleDto[],
  ): Promise<ArticleDocument[]> {
    if (!articles || articles.length === 0) {
      return [];
    }
    return this.articleService.createMany(articles);
  }

  async saveDailyLesson(
    dto: CreateDailyLessonDto,
  ): Promise<DailyLessonDocument> {
    const hasVocabs = Boolean(dto.vocabularies?.length);
    const hasSentences = Boolean(dto.sentences?.length);
    const hasArticles = Boolean(dto.articles?.length);

    if (!hasVocabs && !hasSentences && !hasArticles) {
      throw new Error(
        `Cannot save daily lesson: no content is present for ${dto.domain}/${dto.level} (day ${dto.sequenceNumber})`,
      );
    }
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

  private toDayNumber(date: Date): number {
    return Math.floor(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) /
        (1000 * 60 * 60 * 24),
    );
  }

  private getSequenceForDate(date: Date, createdAt: Date): number {
    return this.toDayNumber(date) - this.toDayNumber(createdAt) + 1;
  }

  private parseDateOnly(value: string): Date | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) {
      return null;
    }

    const [, year, month, day] = match;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));

    if (
      parsed.getFullYear() !== Number(year) ||
      parsed.getMonth() !== Number(month) - 1 ||
      parsed.getDate() !== Number(day)
    ) {
      return null;
    }

    return parsed;
  }

  async getCurrentSequenceForUser(userId: string): Promise<number> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.getSequenceForDate(new Date(), new Date(user.createdAt));
  }

  async getDailyLessonForUser(userId: string, date?: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.domain || !user.level) {
      throw new NotFoundException('User not found or onboarding not completed');
    }

    const createdAt = new Date(user.createdAt);
    const currentSequenceNumber = this.getSequenceForDate(
      new Date(),
      createdAt,
    );
    let sequenceNumber = currentSequenceNumber;

    if (date) {
      const parsedDate = this.parseDateOnly(date);
      if (!parsedDate) {
        throw new BadRequestException('Invalid date, expected YYYY-MM-DD');
      }

      sequenceNumber = this.getSequenceForDate(parsedDate, createdAt);

      if (sequenceNumber > currentSequenceNumber) {
        throw new ForbiddenException(
          'Future daily lessons are not available yet',
        );
      }
    }

    if (sequenceNumber < 1) {
      throw new NotFoundException(
        'No daily lesson exists before this account was created',
      );
    }

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

  async create(createDailyLessonDto: CreateDailyLessonDto) {
    return this.dailyLessonRepository.upsert(createDailyLessonDto);
  }

  async triggerGeneration(dto?: TriggerDailyLessonGenerationDto) {
    if (dto?.domain && dto?.level) {
      const seq =
        dto.sequenceNumber ??
        (await this.dailyLessonRepository.getLatestSequenceNumber(
          dto.domain,
          dto.level,
        )) + 1;

      await inngest.send({
        name: 'speaktra/generate-daily-lesson',
        data: {
          domain: dto.domain,
          level: dto.level,
          sequenceNumber: seq,
        },
      });

      return {
        message: `Generation triggered for ${dto.domain}/${dto.level} (day ${seq})`,
        domain: dto.domain,
        level: dto.level,
        sequenceNumber: seq,
      };
    }

    const domains = Object.values(Domain);
    const levels = Object.values(Level);
    const events: Array<{
      name: 'speaktra/generate-daily-lesson';
      data: { domain: Domain; level: Level; sequenceNumber: number };
    }> = [];

    for (const d of domains) {
      for (const l of levels) {
        const seq =
          (await this.dailyLessonRepository.getLatestSequenceNumber(d, l)) + 1;
        events.push({
          name: 'speaktra/generate-daily-lesson',
          data: { domain: d, level: l, sequenceNumber: seq },
        });
      }
    }

    await inngest.send(events);

    return {
      message: `Triggered generation for ${events.length} domain/level combinations`,
      count: events.length,
      events: events.map((e) => e.data),
    };
  }
}
