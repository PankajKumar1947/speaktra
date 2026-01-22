import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Domain, DomainEntity } from './entities/domain.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Domain.name, schema: DomainEntity }]),
  ],
  controllers: [DomainController],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
