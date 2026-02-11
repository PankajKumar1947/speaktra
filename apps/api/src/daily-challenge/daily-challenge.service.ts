import { Injectable, Logger } from '@nestjs/common';
import { CreateDailyChallengeDto } from './dto/create-daily-challenge.dto';
import { UpdateDailyChallengeDto } from './dto/update-daily-challenge.dto';
import { AIContentGenerationService } from './ai-content-generation.service';
import { DomainService } from 'src/domain/domain.service';
import { DomainDocument } from 'src/domain/entities/domain.entity';
import { VocabularyService } from 'src/vocabulary/vocabulary.service';

@Injectable()
export class DailyChallengeService {
  private readonly logger = new Logger(DailyChallengeService.name);
  constructor(
    private readonly aiContentGenerationService: AIContentGenerationService,
    private readonly domainService: DomainService,
    private readonly vocabularyService: VocabularyService,
  ) {}
  async create(createDailyChallengeDto: CreateDailyChallengeDto) {
    console.log(createDailyChallengeDto);
    // 1. generate the 5 vocabularies
    const domain = await this.domainService.findOne(
      createDailyChallengeDto.domain,
    );

    if (!domain) {
      throw new Error('Domain not found');
    }

    const response = await this.aiContentGenerationService.generateVocabularies(
      domain as DomainDocument,
      createDailyChallengeDto.level,
      5,
    );

    response.map(async (v) => {
      await this.vocabularyService.create({
        ...v,
        domainId: domain?._id?.toString(),
      });
    });

    this.logger.log(`✅ Created ${response.length} vocabularies`);

    // 2. generate the 5 sentences
    // 3. generate the 3 articles
    // 4. create the daily challenge
    return 'This action adds a new dailyChallenge';
  }

  findAll() {
    return `This action returns all dailyChallenge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyChallenge`;
  }

  update(id: number, updateDailyChallengeDto: UpdateDailyChallengeDto) {
    console.log(updateDailyChallengeDto);
    return `This action updates a #${id} dailyChallenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyChallenge`;
  }
}
