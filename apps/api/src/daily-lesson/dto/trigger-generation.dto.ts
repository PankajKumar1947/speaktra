import { ApiPropertyOptional } from '@nestjs/swagger';
import { Domain, Level } from '@repo/schema';

export class TriggerDailyLessonGenerationDto {
  @ApiPropertyOptional({
    enum: Domain,
    description: 'Domain to generate lesson for',
  })
  domain?: Domain;

  @ApiPropertyOptional({
    enum: Level,
    description: 'Proficiency level to generate lesson for',
  })
  level?: Level;

  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'Sequence number (defaults to next auto-incremented number)',
  })
  sequenceNumber?: number;
}
