import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { DailyChallengeService } from './daily-challenge.service';

@Processor('daily-challenge')
export class DailyChallengeProcessor extends WorkerHost {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {
    super();
  }

  async process(job: Job): Promise<void> {
    console.log('procesing job', job.data);
    const { domain, level, sequenceNumber } = job.data;
    await this.dailyChallengeService.create({
      domain,
      level,
      sequenceNumber,
    });
    console.log('job completed', job.id);
  }
}

/**
 * To Run the redis server use this command
 * docker run -itd -p 6379:6379 redis
 */
