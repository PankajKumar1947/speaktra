import { PartialType } from '@nestjs/swagger';
import { CreateDailyLessonDto } from './create-daily-lesson.dto';

export class UpdateDailyLessonDto extends PartialType(CreateDailyLessonDto) {}
