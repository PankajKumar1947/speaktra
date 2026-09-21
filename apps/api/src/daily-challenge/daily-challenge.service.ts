import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDailyChallengeDto } from './dto/create-daily-challenge.dto';
import { UpdateDailyChallengeDto } from './dto/update-daily-challenge.dto';
import { AIContentGenerationService } from './ai-content-generation.service';
import { VocabularyService } from 'src/vocabulary/vocabulary.service';
import { SentenceService } from 'src/sentence/sentence.service';
import { ArticleService } from 'src/article/article.service';
import mongoose, { Model } from 'mongoose';
import { DailyChallenge } from './entities/daily-challenge.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Domain, Level } from '@repo/schema';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class DailyChallengeService {
  private readonly logger = new Logger(DailyChallengeService.name);
  constructor(
    @InjectModel(DailyChallenge.name)
    private readonly dailyChallengeModel: Model<DailyChallenge>,
    private readonly aiContentGenerationService: AIContentGenerationService,
    private readonly vocabularyService: VocabularyService,
    private readonly sentenceService: SentenceService,
    private readonly articleService: ArticleService,
    private readonly userService: UsersService,
    @InjectQueue('daily-challenge')
    private dailyChallengeQueue: Queue,
  ) {}

  async createDailyChallengeJob() {
    const domains = Object.values(Domain);
    const levels = Object.values(Level);
    for (const domain of domains) {
      for (const level of levels) {
        const prevChallenge = await this.dailyChallengeModel
          .findOne({
            domain,
            level,
          })
          .sort({ sequenceNumber: -1 });
        const job = await this.dailyChallengeQueue.add(
          'create-daily-challenge',
          {
            domain,
            level,
            sequenceNumber: (prevChallenge?.sequenceNumber || 0) + 1,
          },
        );

        this.logger.log(
          `${domain} - ${level} - Added job to queue: ${job?.id}`,
        );
      }
    }
  }

  async create(createDailyChallengeDto: CreateDailyChallengeDto) {
    // check if the daily challenge already exists
    const existingDailyChallenge = await this.dailyChallengeModel.findOne({
      domain: createDailyChallengeDto.domain,
      level: createDailyChallengeDto.level,
      sequenceNumber: createDailyChallengeDto.sequenceNumber,
    });
    if (existingDailyChallenge) {
      throw new BadRequestException('Daily challenge already exists');
    }
    const domain = createDailyChallengeDto.domain;

    const dailyChallenge = {
      sequenceNumber: createDailyChallengeDto.sequenceNumber,
      domain,
      level: createDailyChallengeDto.level,
      vocabularies: [] as mongoose.Types.ObjectId[],
      sentences: [] as mongoose.Types.ObjectId[],
      articles: [] as mongoose.Types.ObjectId[],
    };

    const lastVocabularies = await this.vocabularyService.getLastNVocabularies(
      500,
      domain,
    );

    // 1. Generate Vocabularies
    let retryCount = 0;
    let vocabulariesGenerated: string[] = [];
    while (true) {
      // retry max 3 times
      if (retryCount > 3) {
        throw new Error('Failed to generate vocabularies');
      }
      retryCount++;
      try {
        const vocabularyResponse =
          await this.aiContentGenerationService.generateVocabularies({
            domain,
            level: createDailyChallengeDto.level,
            count: 5,
            lastVocabularies: lastVocabularies,
          });

        if (vocabularyResponse && vocabularyResponse.length > 0) {
          const vocabulariesIds = await this.vocabularyService.createMany(
            vocabularyResponse.map((v) => ({
              ...v,
              domain,
            })),
          );
          dailyChallenge.vocabularies = vocabulariesIds.map(
            (v) => v._id as mongoose.Types.ObjectId,
          );
          vocabulariesGenerated = vocabularyResponse.map((v) => v.word);

          this.logger.log(
            `✅ Created ${vocabulariesGenerated.length} vocabularies`,
          );
          await sleep(2000);
          break;
        } else {
          this.logger.log(
            `❌ Failed to generate vocabularies. Retrying... ${retryCount}`,
          );
          await sleep(10000);
          continue;
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        this.logger.error(
          `❌ Error generating vocabularies: ${errorMessage}. Retrying... ${retryCount}`,
        );
        await sleep(15000);
      }
    }

    // 2. Generate Sentences
    retryCount = 0;
    while (true) {
      // retry max 3 times
      if (retryCount > 3) {
        throw new Error('Failed to generate sentences');
      }
      retryCount++;
      try {
        const sentenceRes =
          await this.aiContentGenerationService.generateSentences({
            domain,
            level: createDailyChallengeDto.level,
            count: 5,
            vocabBasedOn: vocabulariesGenerated,
          });

        if (sentenceRes && sentenceRes.length > 0) {
          const sentencesIds = await this.sentenceService.createMany(
            sentenceRes.map((s) => ({
              ...s,
              domain,
            })),
          );
          dailyChallenge.sentences = sentencesIds.map(
            (s) => s._id as mongoose.Types.ObjectId,
          );
          this.logger.log(`✅ Created ${sentenceRes.length} sentences`);
          await sleep(2000);
          break;
        } else {
          this.logger.log(
            `❌ Failed to generate sentences. Retrying... ${retryCount}`,
          );
          await sleep(10000);
          continue;
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        this.logger.error(
          `❌ Error generating sentences: ${errorMessage}. Retrying... ${retryCount}`,
        );
        await sleep(15000);
      }
    }

    // 3. Generate the 3 Articles
    retryCount = 0;
    while (true) {
      // retry max 3 times
      if (retryCount > 3) {
        throw new Error('Failed to generate articles');
      }
      retryCount++;
      try {
        const articleRes =
          await this.aiContentGenerationService.generateArticles(
            domain,
            createDailyChallengeDto.level as Level,
            vocabulariesGenerated,
          );

        if (articleRes && articleRes.length > 0) {
          const articlesIds = await this.articleService.createMany(
            articleRes.map((a) => ({
              ...a,
              domain,
            })),
          );

          dailyChallenge.articles = articlesIds.map(
            (a) => a._id as mongoose.Types.ObjectId,
          );
          this.logger.log(`✅ Created ${articleRes.length} articles`);
          await sleep(2000);
          break;
        } else {
          this.logger.log(
            `❌ Failed to generate articles. Retrying... ${retryCount}`,
          );
          await sleep(10000);
          continue;
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        this.logger.error(
          `❌ Error generating articles: ${errorMessage}. Retrying... ${retryCount}`,
        );
        await sleep(15000);
      }
    }

    // 4. Create the Daily Challenge
    const dailyChallengeCreated = await this.dailyChallengeModel.create(
      dailyChallenge as unknown as DailyChallenge,
    );
    this.logger.log(`✅ Created daily challenge`);
    return dailyChallengeCreated;
  }

  findAll() {
    return this.dailyChallengeModel.find();
  }

  findOne(id: string) {
    return this.dailyChallengeModel
      .findById(id)
      .populate('vocabularies')
      .populate('sentences')
      .populate('articles');
  }

  update(id: string, updateDailyChallengeDto: UpdateDailyChallengeDto) {
    return this.dailyChallengeModel.findByIdAndUpdate(
      id,
      updateDailyChallengeDto,
      { new: true },
    );
  }

  async remove(id: string) {
    // deleting this daily challenge and its related vocabularies, sentences, and articles
    const dailyChallenge = await this.dailyChallengeModel.findById(id);
    if (!dailyChallenge) {
      throw new Error('Daily challenge not found');
    }

    for (const v of dailyChallenge.vocabularies) {
      await this.vocabularyService.remove(v.toString());
    }
    for (const s of dailyChallenge.sentences) {
      await this.sentenceService.remove(s.toString());
    }
    for (const a of dailyChallenge.articles) {
      await this.articleService.remove(a.toString());
    }

    return this.dailyChallengeModel.findByIdAndDelete(id);
  }

  async getDailyChallengeForUser(userId: string) {
    // get the user's domain and level
    const user = await this.userService.findOne(userId);
    if (!user || !user.domain || !user.level) {
      throw new Error('User not found or onboarding not completed');
    }

    const sequenceNumber =
      Math.floor(
        (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;
    this.logger.log(`Sequence number for user ${user.name}: ${sequenceNumber}`);

    const dailyChallenge = await this.dailyChallengeModel.findOne({
      domain: user.domain,
      level: user.level,
      sequenceNumber: sequenceNumber,
    });
    if (!dailyChallenge) {
      throw new NotFoundException('Daily challenge not found');
    }
    return dailyChallenge;
  }

  async getDailyVocabularies(dailyChallengeId: string) {
    const dailyChallenge = await this.dailyChallengeModel
      .findById(dailyChallengeId)
      .populate('vocabularies');
    return dailyChallenge?.vocabularies;
  }

  async getDailySentences(dailyChallengeId: string) {
    const dailyChallenge = await this.dailyChallengeModel
      .findById(dailyChallengeId)
      .populate('sentences');
    return dailyChallenge?.sentences;
  }

  async getDailyArticles(dailyChallengeId: string) {
    // exclude description from the articles
    const dailyChallenge = await this.dailyChallengeModel
      .findById(dailyChallengeId)
      .populate('articles')
      .select({
        articles: {
          description: 0,
        },
      });
    return dailyChallenge?.articles;
  }
}
