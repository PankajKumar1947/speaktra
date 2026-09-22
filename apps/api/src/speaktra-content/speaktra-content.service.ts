import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpeaktraContentService {
  constructor(private readonly configService: ConfigService) {}

  getUrl(relativePath: string): string {
    const cdnBase = this.configService
      .getOrThrow<string>('CONTENT_CDN_BASE_URL')
      .replace(/\/+$/, '');
    const owner = this.configService.getOrThrow<string>('CONTENT_REPO_OWNER');
    const repo = this.configService.getOrThrow<string>('CONTENT_REPO_NAME');
    const ref = this.configService.get<string>('CONTENT_REPO_REF', 'main');

    const cleanPath = relativePath.replace(/^\/+/, '');
    return `${cdnBase}/${owner}/${repo}@${ref}/${cleanPath}`;
  }

  async fetchJson<T>(relativePath: string): Promise<T> {
    const url = this.getUrl(relativePath);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
      );
    }

    return (await response.json()) as T;
  }
}
