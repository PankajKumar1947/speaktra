import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Domain, Level } from '@repo/schema';
import {
  DailyLesson,
  DailyLessonDocument,
} from './entities/daily-lesson.entity';
import { CreateDailyLessonDto } from './dto/create-daily-lesson.dto';

export interface DailyLessonFilter {
  domain?: Domain;
  level?: Level;
  sequenceNumber?: number;
  theme?: string;
  [key: string]: unknown;
}

@Injectable()
export class DailyLessonRepository {
  constructor(
    @InjectModel(DailyLesson.name)
    private readonly dailyLessonModel: Model<DailyLessonDocument>,
  ) {}

  async upsert(data: CreateDailyLessonDto): Promise<DailyLessonDocument> {
    return this.dailyLessonModel.findOneAndUpdate(
      {
        sequenceNumber: data.sequenceNumber,
        domain: data.domain,
        level: data.level,
      },
      data,
      { upsert: true, new: true },
    );
  }

  async findBySequence(
    domain: Domain,
    level: Level,
    sequenceNumber: number,
  ): Promise<DailyLessonDocument | null> {
    return this.dailyLessonModel
      .findOne({ domain, level, sequenceNumber })
      .populate('vocabularies')
      .populate('sentences')
      .populate('articles')
      .exec();
  }

  async findById(
    id: string | Types.ObjectId,
  ): Promise<DailyLessonDocument | null> {
    return this.dailyLessonModel
      .findById(id)
      .populate('vocabularies')
      .populate('sentences')
      .populate('articles')
      .exec();
  }

  async findAll(
    filter: DailyLessonFilter = {},
    options?: { skip?: number; limit?: number },
  ): Promise<DailyLessonDocument[]> {
    const query = this.dailyLessonModel
      .find(filter)
      .sort({ sequenceNumber: 1 });

    if (options?.skip) {
      query.skip(options.skip);
    }
    if (options?.limit) {
      query.limit(options.limit);
    }

    return query.exec();
  }

  async exists(
    domain: Domain,
    level: Level,
    sequenceNumber: number,
  ): Promise<boolean> {
    const count = await this.dailyLessonModel.countDocuments({
      domain,
      level,
      sequenceNumber,
      'vocabularies.0': { $exists: true },
      'sentences.0': { $exists: true },
      'articles.0': { $exists: true },
    });
    return count > 0;
  }
}
