import { Injectable } from '@nestjs/common';
import { DOMAINS, DomainItem } from '@repo/schema';

@Injectable()
export class DomainService {
  findAll(): DomainItem[] {
    return DOMAINS;
  }
}
