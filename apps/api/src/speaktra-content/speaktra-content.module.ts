import { Global, Module } from '@nestjs/common';
import { SpeaktraContentService } from './speaktra-content.service';

@Global()
@Module({
  providers: [SpeaktraContentService],
  exports: [SpeaktraContentService],
})
export class SpeaktraContentModule {}
