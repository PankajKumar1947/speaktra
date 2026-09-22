import { Domain, Level } from '@repo/schema';
import { Types } from 'mongoose';

export class CreateDailyLessonDto {
  sequenceNumber!: number;
  domain!: Domain;
  level!: Level;
  theme?: string;
  vocabularies!: (Types.ObjectId | string)[];
  sentences!: (Types.ObjectId | string)[];
  articles!: (Types.ObjectId | string)[];
}
