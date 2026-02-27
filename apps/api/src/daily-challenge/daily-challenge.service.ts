import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDailyChallengeDto } from './dto/create-daily-challenge.dto';
import { UpdateDailyChallengeDto } from './dto/update-daily-challenge.dto';
import { AIContentGenerationService } from './ai-content-generation.service';
import { DomainService } from 'src/domain/domain.service';
import { DomainDocument } from 'src/domain/entities/domain.entity';
import { VocabularyService } from 'src/vocabulary/vocabulary.service';
import { SentenceService } from 'src/sentence/sentence.service';
import { ArticleService } from 'src/article/article.service';
import mongoose, { Model } from 'mongoose';
import { DailyChallenge } from './entities/daily-challenge.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DailyChallengeService {
  private readonly logger = new Logger(DailyChallengeService.name);
  constructor(
    @InjectModel(DailyChallenge.name)
    private readonly dailyChallengeModel: Model<DailyChallenge>,
    private readonly aiContentGenerationService: AIContentGenerationService,
    private readonly domainService: DomainService,
    private readonly vocabularyService: VocabularyService,
    private readonly sentenceService: SentenceService,
    private readonly articleService: ArticleService,
    private readonly userService: UsersService,
  ) {}

  async create(createDailyChallengeDto: CreateDailyChallengeDto) {
    // check if the daily challenge already exists
    const existingDailyChallenge = await this.dailyChallengeModel.findOne({
      domain: createDailyChallengeDto.domain,
      difficulty: createDailyChallengeDto.difficulty,
      level: createDailyChallengeDto.level,
      sequenceNumber: createDailyChallengeDto.sequenceNumber,
    });
    if (existingDailyChallenge) {
      throw new BadRequestException('Daily challenge already exists');
    }
    // 1. generate the 5 vocabularies
    const domain = await this.domainService.findOne(
      createDailyChallengeDto.domain,
    );

    if (!domain) {
      throw new NotFoundException('Domain not found');
    }

    const dailyChallenge = {
      sequenceNumber: 1,
      domain: domain._id as mongoose.Types.ObjectId,
      difficulty: createDailyChallengeDto.difficulty,
      level: createDailyChallengeDto.level,
      vocabularies: [] as mongoose.Types.ObjectId[],
      sentences: [] as mongoose.Types.ObjectId[],
      articles: [] as mongoose.Types.ObjectId[],
    };

    const lastVocabularies = await this.vocabularyService.getLastNVocabularies(
      50,
      domain._id,
    );

    const vocabulariesGenerated =
      await this.aiContentGenerationService.generateVocabularies({
        domain: domain.name,
        level: createDailyChallengeDto.level,
        count: 5,
        lastVocabularies: lastVocabularies,
      });

    for (const v of vocabulariesGenerated) {
      const res = await this.vocabularyService.create({
        ...v,
        domainId: domain?._id?.toString(),
      });
      dailyChallenge.vocabularies.push(res._id as mongoose.Types.ObjectId);
    }

    this.logger.log(`✅ Created ${vocabulariesGenerated.length} vocabularies`);

    // 2. generate the 5 sentences
    const sentencesGenerated =
      await this.aiContentGenerationService.generateSentences({
        domain: domain.name,
        level: createDailyChallengeDto.level,
        count: 5,
        vocabBasedOn: vocabulariesGenerated.map((v) => v.word),
      });

    for (const s of sentencesGenerated) {
      const res = await this.sentenceService.create({
        ...s,
        domainId: domain?._id?.toString(),
      });
      dailyChallenge.sentences.push(res._id as mongoose.Types.ObjectId);
    }
    this.logger.log(`✅ Created ${sentencesGenerated.length} sentences`);

    // 3. generate the 3 articles
    const articlesGenerated =
      await this.aiContentGenerationService.generateArticles(
        domain as DomainDocument,
        createDailyChallengeDto.level,
      );

    for (const a of articlesGenerated) {
      const res = await this.articleService.create({
        ...a,
        domainId: domain?._id?.toString(),
      });
      dailyChallenge.articles.push(res._id as mongoose.Types.ObjectId);
    }
    this.logger.log(`✅ Created ${articlesGenerated.length} articles`);

    // 4. create the daily challenge
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
      .populate('domain')
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
