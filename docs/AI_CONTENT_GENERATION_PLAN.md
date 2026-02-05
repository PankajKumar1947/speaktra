# AI Content Generation Plan

> **Companion Document** to [DAILY_CHALLENGE_CREATION_GUIDE.md](DAILY_CHALLENGE_CREATION_GUIDE.md)
>
> This document covers the technical implementation for **automatic AI-driven content generation** for daily challenges. It focuses on efficiency, avoiding duplicates, and building on prior content.

## Overview

Daily challenges and content are automatically created **24 hours before live date** by AI. This plan ensures:

- No duplicate content generation
- Smart content building on past themes
- Cost-efficient batch operations
- 24/7 monitoring and alerting

---

## Automated AI Generation (Scheduled)

**Requirement:** Daily challenges and content automatically created 24 hours before live date by AI

### Architecture

```
┌─────────────────────────────────────────────────┐
│          Scheduler (Cron / Task Queue)          │
│  Triggers at: 00:00 UTC (24hrs before live)    │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│        AI Content Generation Service            │
│  - Generate vocabulary based on domain+level    │
│  - Generate example sentences                   │
│  - Generate articles/reading material           │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│    Create Resources via API (in sequence)       │
│  1. Create Vocabularies                         │
│  2. Create Sentences                            │
│  3. Create Articles                             │
│  4. Create Daily Challenge (reference all)      │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│    Logging & Error Handling                     │
│  - Track all IDs created                        │
│  - Retry failed steps                           │
│  - Alert on critical failures                   │
│  - Send notification on completion              │
└─────────────────────────────────────────────────┘
```

### Implementation Strategy

#### 1. **Create AI Generation Service**

```typescript
// ai-content-generator.service.ts
@Injectable()
export class AIContentGeneratorService {
  async generateVocabularies(
    domain: string,
    difficulty: string,
    count: number = 5,
  ): Promise<CreateVocabularyDto[]> {
    // Call AI model (OpenAI, Anthropic, etc.)
    // Generate diverse vocabulary for the domain
    return vocabList;
  }

  async generateSentences(
    domain: string,
    difficulty: string,
    vocabularies: string[], // Include generated vocab
    count: number = 3,
  ): Promise<CreateSentenceDto[]> {
    // Generate sentences using the vocabulary
    return sentenceList;
  }

  async generateArticles(
    domain: string,
    difficulty: string,
    keywords: string[], // From vocabulary
    count: number = 1,
  ): Promise<CreateArticleDto[]> {
    // Generate reading material
    return articleList;
  }
}
```

#### 2. **Create Daily Challenge Generator**

```typescript
// daily-challenge-generator.service.ts
@Injectable()
export class DailyChallengeGeneratorService {
  constructor(
    private aiService: AIContentGeneratorService,
    private vocabularyService: VocabularyService,
    private sentenceService: SentenceService,
    private articleService: ArticleService,
    private dailyChallengeService: DailyChallengeService,
    private logger: Logger,
  ) {}

  async generateAndCreateDailyChallenge(
    domain: string,
    difficulty: string,
    level: string,
    sequenceNumber: number,
  ): Promise<{
    challengeId: string;
    vocabularyIds: string[];
    sentenceIds: string[];
    articleIds: string[];
    status: "success" | "partial" | "failed";
    errors?: string[];
  }> {
    const tracking = {
      vocabularyIds: [],
      sentenceIds: [],
      articleIds: [],
      errors: [],
    };

    try {
      // Step 1: Generate vocabulary
      this.logger.log(`Generating vocabularies for ${domain}...`);
      const vocabDtos = await this.aiService.generateVocabularies(
        domain,
        difficulty,
        5,
      );
      const vocabularies = await Promise.all(
        vocabDtos.map((dto) => this.vocabularyService.create(dto)),
      );
      tracking.vocabularyIds = vocabularies.map((v) => v.id);
      this.logger.log(
        `✅ Created ${tracking.vocabularyIds.length} vocabularies`,
      );

      // Step 2: Generate sentences using vocabulary
      this.logger.log(`Generating sentences...`);
      const sentenceDtos = await this.aiService.generateSentences(
        domain,
        difficulty,
        tracking.vocabularyIds,
        3,
      );
      const sentences = await Promise.all(
        sentenceDtos.map((dto) => this.sentenceService.create(dto)),
      );
      tracking.sentenceIds = sentences.map((s) => s.id);
      this.logger.log(`✅ Created ${tracking.sentenceIds.length} sentences`);

      // Step 3: Generate articles
      this.logger.log(`Generating articles...`);
      const keywords = vocabularies.map((v) => v.word);
      const articleDtos = await this.aiService.generateArticles(
        domain,
        difficulty,
        keywords,
        1,
      );
      const articles = await Promise.all(
        articleDtos.map((dto) => this.articleService.create(dto)),
      );
      tracking.articleIds = articles.map((a) => a.id);
      this.logger.log(`✅ Created ${tracking.articleIds.length} articles`);

      // Step 4: Create Daily Challenge
      this.logger.log(`Creating daily challenge...`);
      const challenge = await this.dailyChallengeService.create({
        sequenceNumber,
        domain,
        difficulty,
        level,
        vocabularies: tracking.vocabularyIds,
        sentences: tracking.sentenceIds,
        articles: tracking.articleIds,
      });
      this.logger.log(`✅ Created daily challenge: ${challenge.id}`);

      return {
        challengeId: challenge.id,
        ...tracking,
        status: "success",
      };
    } catch (error) {
      this.logger.error(`❌ Error: ${error.message}`);
      tracking.errors = [error.message];

      // Partial success - return what was created
      return {
        challengeId: null,
        ...tracking,
        status: tracking.vocabularyIds.length > 0 ? "partial" : "failed",
      };
    }
  }
}
```

#### 3. **Create Scheduler Task**

```typescript
// daily-challenge-scheduler.service.ts
@Injectable()
export class DailyChallengeSchedulerService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private generatorService: DailyChallengeGeneratorService,
    private logger: Logger,
  ) {}

  @Cron("0 0 * * *") // Every day at midnight UTC
  async scheduleDailyChallengeGeneration() {
    this.logger.log("🚀 Starting scheduled daily challenge generation...");

    // Get tomorrow's date for sequenceNumber
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const sequenceNumber = Math.floor(
      tomorrow.getTime() / (1000 * 60 * 60 * 24),
    );

    // Get configured domains to generate for
    const domains = ["business", "technology", "healthcare"]; // Configure as needed

    for (const domain of domains) {
      try {
        const result =
          await this.generatorService.generateAndCreateDailyChallenge(
            domain,
            "medium",
            "intermediate",
            sequenceNumber,
          );

        if (result.status === "success") {
          this.logger.log(
            `✅ Successfully created daily challenge for ${domain} (ID: ${result.challengeId})`,
          );
          // Send notification
          await this.notifySuccess(result);
        } else if (result.status === "partial") {
          this.logger.warn(`⚠️ Partial creation for ${domain}`);
          await this.notifyPartialFailure(result, domain);
        } else {
          this.logger.error(`❌ Failed to create for ${domain}`);
          await this.notifyFailure(result, domain);
        }
      } catch (error) {
        this.logger.error(`❌ Critical error for ${domain}: ${error.message}`);
        await this.notifyFailure(error, domain);
      }
    }

    this.logger.log("✅ Scheduled generation complete");
  }

  private async notifySuccess(result: any) {
    // Send email/webhook/notification
    console.log(`Daily challenge created: ${result.challengeId}`);
  }

  private async notifyPartialFailure(result: any, domain: string) {
    // Alert admin or retry
    console.warn(`Partial failure for ${domain}: ${result.errors}`);
  }

  private async notifyFailure(error: any, domain: string) {
    // Alert admin to retry manually
    console.error(`Failed for ${domain}: ${error}`);
  }
}
```

#### 4. **Module Setup**

```typescript
// daily-challenge.module.ts
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    DailyChallengeGeneratorService,
    DailyChallengeSchedulerService,
    AIContentGeneratorService,
    // ... other services
  ],
})
export class DailyChallengeModule {}
```

### Scheduling Options

#### Option 1: **NestJS Schedule (Built-in)**

```typescript
// Runs at specific time every day
@Cron('0 0 * * *') // Midnight
async generate() { ... }

// Or use CronExpression for specific timezone
@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'UTC' })
```

#### Option 2: **Bull Queue (Redis)**

```typescript
// For more reliability and retries
@Processor('daily-challenges')
export class DailyChallengeQueue {
  @Process()
  async generateChallenge(job: Job) {
    return this.generatorService.generateAndCreateDailyChallenge(...);
  }
}

// Trigger:
this.challengeQueue.add(
  { domain, difficulty, level, sequence },
  {
    delay: 24 * 60 * 60 * 1000, // 24 hours
    repeat: { cron: '0 0 * * *' } // Daily
  }
);
```

#### Option 3: **External Scheduler (Node-cron)**

```bash
# Shell script triggered by system cron
0 0 * * * /usr/bin/curl -X POST http://localhost:3000/api/daily-challenge/generate
```

### Workflow: Creation 24 Hours Before Live

```
Timeline:
├─ Day 0, 00:00 UTC
│  └─ Scheduler triggers AI generation
│     ├─ AI generates content
│     ├─ API creates vocabularies
│     ├─ API creates sentences
│     ├─ API creates articles
│     └─ API creates daily challenge
│
├─ Day 0, 00:05 UTC
│  └─ Verification & notifications
│     ├─ Check if all created
│     ├─ Log IDs for tracking
│     └─ Send admin notification
│
├─ Day 0, 12:00 UTC (12 hours before live)
│  └─ Pre-live verification
│     ├─ Validate challenge content
│     ├─ Check references integrity
│     └─ Prepare for release
│
└─ Day 1, 00:00 UTC (Live)
   └─ Daily challenge goes live to users
```

### Error Handling & Retries

```typescript
// Retry logic for transient failures
async retryGenerateChallenge(
  domain: string,
  maxRetries: number = 3
): Promise<any> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await this.generatorService.generateAndCreateDailyChallenge(
        domain, 'medium', 'intermediate', sequenceNumber
      );
    } catch (error) {
      if (attempt < maxRetries) {
        this.logger.warn(`Attempt ${attempt} failed, retrying...`);
        await this.delay(5000 * attempt); // Exponential backoff
      } else {
        this.logger.error(`All ${maxRetries} attempts failed`);
        throw error;
      }
    }
  }
}

private delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### Database Tracking

```typescript
// Create a tracking table for audit trail
@Entity()
export class DailyChallengeGeneration {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sequenceNumber: number;

  @Column()
  domain: string;

  @Column()
  difficulty: string;

  @Column()
  level: string;

  @Column("simple-array")
  vocabularyIds: string[];

  @Column("simple-array")
  sentenceIds: string[];

  @Column("simple-array")
  articleIds: string[];

  @Column()
  dailyChallengeId: string;

  @Column()
  status: "success" | "partial" | "failed";

  @Column("text", { nullable: true })
  errors: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Monitoring & Alerting

```typescript
// Health check endpoint
@Get('health/daily-challenge')
async checkDailyChallengeHealth() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const lastGeneration = await this.generationRepo.findOne({
    where: { createdAt: MoreThan(yesterday) },
    order: { createdAt: 'DESC' }
  });

  return {
    status: lastGeneration?.status === 'success' ? 'healthy' : 'warning',
    lastGeneration,
    timestamp: new Date()
  };
}
```

---

## Efficient AI Content Generation Plan

### Goals

- Avoid duplicates while building on prior content
- Keep generation fast and low-cost
- Ensure daily challenges are created 24 hours before live
- Smart memory to avoid generating previously-seen content

### High-Level Pipeline

```
T-24h Scheduler Trigger
  ├─ Load domain config + generation rules
  ├─ Pull recent content window (30-90 days)
  ├─ Generate AI drafts (vocab, sentences, articles)
  ├─ De-dupe (hash + semantic similarity)
  ├─ Persist new content
  └─ Create daily challenge with references
```

### Efficiency Principles

- **Windowed memory**: Only load the last N days of content for the same domain/level/difficulty
- **Batch generation**: Generate vocab + sentences + article in a single AI call per domain
- **Deterministic seeds**: Use date + domain as seed to keep content stable if retries happen
- **Two-stage filters**: Cheap hash check first, embeddings second

### Detailed Plan

#### 1. Config and Inputs

- Domain configuration table (domain, level, difficulty, vocabCount, sentenceCount, articleCount)
- Generate for tomorrow's date only

#### 2. Retrieve Memory Window (Memory Module)

- Fetch last 30-90 days of content for the same domain/level/difficulty
- Build an **avoid list** (words, sentences, article titles)
- Store embeddings for semantic similarity checking

```typescript
// memory.service.ts
@Injectable()
export class ContentMemoryService {
  async getMemorandumForGeneration(
    domain: string,
    difficulty: string,
    level: string,
    windowDays: number = 60,
  ): Promise<ContentMemorandum> {
    const windowStart = new Date();
    windowStart.setDate(windowStart.getDate() - windowDays);

    const recentVocab = await this.vocabularyRepo.find({
      where: {
        domain,
        difficulty,
        createdAt: MoreThan(windowStart),
        sourceType: "ai", // Only AI-generated
      },
    });

    const recentSentences = await this.sentenceRepo.find({
      where: {
        domain,
        difficulty,
        createdAt: MoreThan(windowStart),
        sourceType: "ai",
      },
    });

    const recentArticles = await this.articleRepo.find({
      where: {
        domain,
        difficulty,
        createdAt: MoreThan(windowStart),
        sourceType: "ai",
      },
    });

    return {
      domain,
      difficulty,
      level,
      avoidVocab: recentVocab.map((v) => v.word),
      avoidSentences: recentSentences.map((s) => s.sentence),
      avoidTitles: recentArticles.map((a) => a.title),
      embeddings: {
        vocab: recentVocab.map((v) => ({
          word: v.word,
          embedding: v.embedding,
        })),
        sentences: recentSentences.map((s) => ({
          text: s.sentence,
          embedding: s.embedding,
        })),
        articles: recentArticles.map((a) => ({
          title: a.title,
          embedding: a.embedding,
        })),
      },
      generateCount: {
        vocab: 5,
        sentences: 3,
        articles: 1,
      },
    };
  }
}
```

#### 3. Single AI Request per Domain (Batch Generation)

```json
{
  "domain": "business",
  "difficulty": "medium",
  "level": "intermediate",
  "targets": { "vocab": 5, "sentences": 3, "articles": 1 },
  "avoid": {
    "vocab": ["conference", "stakeholder", "initiative"],
    "sentences": ["Let's schedule a meeting", "Can we discuss the timeline?"],
    "titles": ["Effective Business Writing"]
  },
  "themes": ["professional communication", "team management"],
  "style": { "tone": "professional", "length": "short" },
  "seed": "business-medium-intermediate-2026-02-05"
}
```

**Why single request?**

- Faster (1 API call vs 3+)
- Better context (AI knows full scope)
- Cheaper (batch discount)
- Coherent content (vocab used in sentences used in article)

#### 4. Fast De-duplication Service (Two-Stage)

```typescript
// deduplication.service.ts
@Injectable()
export class DeduplicationService {
  constructor(
    private embeddingService: EmbeddingService, // e.g., OpenAI embeddings
    private logger: Logger,
  ) {}

  async filterDuplicates(
    candidates: ContentCandidate[],
    memorandum: ContentMemorandum,
  ): Promise<{
    valid: ContentCandidate[];
    duplicates: ContentCandidate[];
    similarityWarning: ContentCandidate[];
  }> {
    const valid: ContentCandidate[] = [];
    const duplicates: ContentCandidate[] = [];
    const similarityWarning: ContentCandidate[] = [];

    // Stage 1: Hash-based exact match (fast)
    for (const candidate of candidates) {
      const hash = this.computeHash(candidate.text);

      if (this.hashExists(hash, memorandum)) {
        this.logger.warn(`❌ Exact hash match found for: ${candidate.text}`);
        duplicates.push(candidate);
        continue;
      }

      // Stage 2: Semantic similarity (slower but accurate)
      const isSimilar = await this.checkSemanticSimilarity(
        candidate,
        memorandum,
        0.86, // similarity threshold
      );

      if (isSimilar) {
        this.logger.warn(`⚠️ Semantic similarity found for: ${candidate.text}`);
        similarityWarning.push(candidate);
        continue;
      }

      valid.push(candidate);
    }

    return { valid, duplicates, similarityWarning };
  }

  private computeHash(text: string): string {
    // Normalize and hash
    const normalized = text.toLowerCase().trim();
    return crypto.createHash("sha256").update(normalized).digest("hex");
  }

  private hashExists(hash: string, memorandum: ContentMemorandum): boolean {
    const allTexts = [
      ...memorandum.avoidVocab,
      ...memorandum.avoidSentences,
      ...memorandum.avoidTitles,
    ];
    return allTexts.some((text) => this.computeHash(text) === hash);
  }

  private async checkSemanticSimilarity(
    candidate: ContentCandidate,
    memorandum: ContentMemorandum,
    threshold: number = 0.86,
  ): Promise<boolean> {
    const candidateEmbedding = await this.embeddingService.embed(
      candidate.text,
    );

    const embeddingsToCheck = memorandum.embeddings[candidate.type] || [];

    for (const memory of embeddingsToCheck) {
      const similarity = this.cosineSimilarity(
        candidateEmbedding,
        memory.embedding,
      );

      if (similarity > threshold) {
        this.logger.debug(
          `Similarity: ${similarity.toFixed(3)} (threshold: ${threshold}) for "${candidate.text}"`,
        );
        return true;
      }
    }

    return false;
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magA * magB);
  }
}
```

#### 5. Persist Content with Metadata

```typescript
// content-persistence.service.ts
@Injectable()
export class ContentPersistenceService {
  async persistGeneratedContent(
    validCandidates: ContentCandidate[],
    batchId: string,
    generation: GenerationMetadata,
  ): Promise<PersistenceResult> {
    const result: PersistenceResult = {
      vocabulary: [],
      sentences: [],
      articles: [],
      errors: [],
    };

    for (const candidate of validCandidates) {
      try {
        const embedding = await this.embeddingService.embed(candidate.text);
        const hash = this.computeHash(candidate.text);

        if (candidate.type === "vocabulary") {
          const vocab = await this.vocabularyService.create({
            ...candidate,
            contentHash: hash,
            embedding,
            generationBatchId: batchId,
            sourceType: "ai",
          });
          result.vocabulary.push(vocab);
        } else if (candidate.type === "sentence") {
          const sentence = await this.sentenceService.create({
            ...candidate,
            contentHash: hash,
            embedding,
            generationBatchId: batchId,
            sourceType: "ai",
          });
          result.sentences.push(sentence);
        } else if (candidate.type === "article") {
          const article = await this.articleService.create({
            ...candidate,
            contentHash: hash,
            embedding,
            generationBatchId: batchId,
            sourceType: "ai",
          });
          result.articles.push(article);
        }
      } catch (error) {
        result.errors.push({ candidate, error: error.message });
      }
    }

    return result;
  }
}
```

#### 6. Create Daily Challenge

```typescript
// daily-challenge-creation.service.ts
async createDailyChallengeFromGeneration(
  generation: GenerationMetadata,
  persistence: PersistenceResult
): Promise<DailyChallenge> {
  return this.dailyChallengeService.create({
    sequenceNumber: generation.sequenceNumber,
    domain: generation.domain,
    difficulty: generation.difficulty,
    level: generation.level,
    vocabularies: persistence.vocabulary.map(v => v.id),
    sentences: persistence.sentences.map(s => s.id),
    articles: persistence.articles.map(a => a.id),
    generationBatchId: generation.batchId
  });
}
```

### Data Model Updates

```typescript
// Enhanced schema with de-duplication metadata
@Schema()
export class Vocabulary {
  // ... existing fields

  @Prop({ type: String, unique: false })
  contentHash: string; // SHA-256 of normalized text

  @Prop({ type: [Number] })
  embedding: number[]; // Vector for semantic similarity

  @Prop({ type: String })
  generationBatchId: string; // Link to generation batch

  @Prop({ default: "manual" })
  sourceType: "manual" | "ai"; // Track source

  @Prop({ default: Date.now })
  createdAt: Date;
}

@Entity()
export class GenerationBatch {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  dateFor: Date; // YYYY-MM-DD for tomorrow

  @Column()
  domain: string;

  @Column()
  difficulty: string;

  @Column()
  level: string;

  @Column("simple-array")
  vocabularyIds: string[];

  @Column("simple-array")
  sentenceIds: string[];

  @Column("simple-array")
  articleIds: string[];

  @Column()
  dailyChallengeId: string;

  @Column()
  status: "success" | "partial" | "failed";

  @Column("int")
  duplicatesFound: number;

  @Column("int")
  similarityWarnings: number;

  @Column("int")
  totalAttempted: number;

  @Column("int")
  totalCreated: number;

  @Column("text", { nullable: true })
  errors: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Retry Strategy

- **Detection**: If duplicates or similarity warnings > 20%, regenerate those items only
- **Regeneration**: Use fresh seeds but same domain/level/difficulty
- **Exponential backoff**: Wait 5s, 10s, 20s between attempts
- **Max retries**: 2-3 attempts per batch
- **Email alert**: On final failure, alert admin with batch details

### Safe Defaults

| Config               | Value           | Rationale                    |
| -------------------- | --------------- | ---------------------------- |
| vocabCount           | 5               | Manageable daily vocab       |
| sentenceCount        | 3               | Variety without overload     |
| articleCount         | 1               | Focus on quality             |
| memory window        | 60 days         | Balanced freshness + variety |
| similarity threshold | 0.86            | High confidence match        |
| max retries          | 3               | Prevent infinite loops       |
| batch generation     | Single API call | Cost + coherence             |

---

## Monitoring & Alerting

### Dashboard Metrics

- Daily generation success rate %
- Duplicates/warnings per batch
- Average generation time
- Cost per generation (tokens used)
- Content quality score (user ratings)

### Alerts

- Generation failed for domain X
- > 30% duplicates in batch
- Average generation time > 5 min
- Low user satisfaction on generated content

### Health Check Endpoint

```bash
GET /health/content-generation
{
  "status": "healthy|warning|critical",
  "lastGeneration": { date, domain, status },
  "duplicateRate": 0.05,
  "averageGenerationTime": 120000,
  "entriesGenerated": { vocab: 15, sentences: 9, articles: 3 }
}
```

---

## Summary: AI Content Generation

**Why Separate AI Generation?**

- Decouple content creation from challenge assembly
- Reuse content across challenges
- Build progressive, cohesive learning paths
- Control quality at generation stage

**Key Steps:**

1. Load memory (past 60 days of content)
2. Batch AI generation in 1 call
3. Two-stage de-dup (hash + embeddings)
4. Persist with metadata
5. Create daily challenge
6. Monitor + alert

**Efficiency Wins:**

- Single API call per domain (vs 3+)
- Hash-first de-dup (vs always embeddings)
- Windowed memory (vs full history)
- Deterministic seeds (stable retries)
- Batch create operations
