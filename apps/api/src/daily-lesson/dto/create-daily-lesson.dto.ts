import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Domain, Level } from '@repo/schema';

export class CreateDailyLessonDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Sequence number of the lesson',
  })
  sequenceNumber!: number;

  @ApiProperty({ enum: Domain, description: 'Domain for the lesson' })
  domain!: Domain;

  @ApiProperty({ enum: Level, description: 'Proficiency level for the lesson' })
  level!: Level;

  @ApiPropertyOptional({ type: String, example: 'Product Strategy & Roadmaps' })
  theme?: string;

  @ApiProperty({ type: [String], description: 'Array of vocabulary ObjectIds' })
  vocabularies!: string[];

  @ApiProperty({ type: [String], description: 'Array of sentence ObjectIds' })
  sentences!: string[];

  @ApiProperty({ type: [String], description: 'Array of article ObjectIds' })
  articles!: string[];
}
