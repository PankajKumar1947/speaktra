import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Domain, DomainItem } from '@repo/schema';

@Injectable()
export class DomainService {
  private readonly logger = new Logger(DomainService.name);
  private cachedDomains: DomainItem[] | null = null;
  private lastFetchedAt = 0;
  private readonly ttlMs = 1000 * 60 * 60 * 24; // 24 hours

  constructor(private readonly configService: ConfigService) {}

  async findAll(): Promise<DomainItem[]> {
    if (this.cachedDomains && Date.now() - this.lastFetchedAt < this.ttlMs) {
      return this.cachedDomains;
    }

    const cdnBase = this.configService
      .get<string>('CONTENT_CDN_BASE_URL', 'https://cdn.jsdelivr.net/gh')
      .replace(/\/+$/, '');
    const owner = this.configService.get<string>(
      'CONTENT_REPO_OWNER',
      'PankajKumar1947',
    );
    const repo = this.configService.get<string>(
      'CONTENT_REPO_NAME',
      'speaktra-content',
    );
    const ref = this.configService.get<string>('CONTENT_REPO_REF', 'main');

    const url = `${cdnBase}/${owner}/${repo}@${ref}/domains.json`;

    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = (await res.json()) as DomainItem[];
        if (Array.isArray(data) && data.length > 0) {
          this.cachedDomains = data;
          this.lastFetchedAt = Date.now();
          return data;
        }
      }
    } catch (error) {
      this.logger.warn(
        `Failed to fetch domains from CDN (${url}), falling back to cached or enum list`,
        error,
      );
    }

    if (this.cachedDomains) {
      return this.cachedDomains;
    }

    // Dynamic fallback from Domain enum without hardcoded names
    return Object.values(Domain).map((id) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      description: `${id} domain`,
    }));
  }
}
