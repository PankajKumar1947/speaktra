import { Controller, Get } from '@nestjs/common';
import { DomainService } from './domain.service';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get()
  findAll() {
    return this.domainService.findAll();
  }
}
