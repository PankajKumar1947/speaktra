import { Injectable } from '@nestjs/common';
import { Domain, DomainItem } from '@repo/schema';
import { SpeaktraContentService } from '../speaktra-content/speaktra-content.service';

@Injectable()
export class DomainService {
  constructor(private readonly speaktraContent: SpeaktraContentService) {}

  async findAll(): Promise<DomainItem[]> {
    try {
      const data =
        await this.speaktraContent.fetchJson<DomainItem[]>('domains.json');

      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch {
      // Fallback to minimal list from Domain enum
    }

    return Object.values(Domain).map((id) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      description: `${id} domain`,
    }));
  }
}
