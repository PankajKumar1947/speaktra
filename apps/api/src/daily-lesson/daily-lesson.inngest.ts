import { inngest } from '../inngest/client';
import { WordBankService } from './word-bank.service';
import { DailyLessonService } from './daily-lesson.service';
import { Domain, Level } from '@repo/schema';

export interface GenerateDailyLessonEventPayload {
  domain: Domain;
  level: Level;
  sequenceNumber: number;
}

export const createDailyLessonFunction = (
  wordBankService: WordBankService,
  dailyLessonService: DailyLessonService,
) =>
  inngest.createFunction(
    {
      id: 'generate-daily-lesson',
      triggers: [
        {
          event: 'speaktra/generate-daily-lesson',
        },
      ],
    },
    async ({ event, step }) => {
      const { domain, level, sequenceNumber } =
        event.data as GenerateDailyLessonEventPayload;

      if (!domain || !level || typeof sequenceNumber !== 'number') {
        throw new Error(
          `Invalid payload for generate-daily-lesson: domain=${domain}, level=${level}, sequenceNumber=${sequenceNumber}`,
        );
      }

      // 0. Check if Daily Lesson already exists
      const alreadyExists = await step.run(
        'check-existing-lesson',
        async () => {
          return dailyLessonService.exists(domain, level, sequenceNumber);
        },
      );

      if (alreadyExists) {
        return {
          status: 'skipped',
          message: `Daily lesson for ${domain}/${level} (day ${sequenceNumber}) already exists.`,
        };
      }

      // 1. Get Words from Word Bank
      const wordSelection = await step.run(
        'get-words-from-word-bank',
        async () => {
          try {
            return await wordBankService.getDailyWords(
              domain,
              level,
              sequenceNumber,
            );
          } catch (error) {
            return {
              error: error instanceof Error ? error.message : String(error),
            };
          }
        },
      );

      if (
        !wordSelection ||
        'error' in wordSelection ||
        !wordSelection.words?.length
      ) {
        const reason =
          wordSelection && 'error' in wordSelection
            ? ` Reason: ${wordSelection.error}`
            : '';
        return {
          status: 'skipped',
          message: `No word bank content found for ${domain}/${level} (day ${sequenceNumber}).${reason} Skipped.`,
        };
      }

      const { theme, words } = wordSelection;

      // 2. Generate Vocabs
      const generatedVocabs = await step.run('generate-vocabs', async () => {
        return dailyLessonService.generateVocab({
          domain,
          level,
          theme,
          words,
        });
      });

      // 3. Save Vocabs to database (only if data is present)
      const savedVocabs = await step.run(
        'save-vocabs-to-database',
        async () => {
          if (!generatedVocabs?.length) {
            return [];
          }
          return dailyLessonService.saveVocabsToDatabase(generatedVocabs);
        },
      );

      // 4. Generate Sentence
      const targetWords = words.map((w) => w.word);
      const generatedSentences = await step.run(
        'generate-sentences',
        async () => {
          return dailyLessonService.generateSentence({
            domain,
            level,
            theme,
            vocabularyWords: targetWords,
            count: 5,
          });
        },
      );

      // 5. Save Sentence to database (only if data is present)
      const savedSentences = await step.run(
        'save-sentences-to-database',
        async () => {
          if (!generatedSentences?.length) {
            return [];
          }
          return dailyLessonService.saveSentencesToDatabase(generatedSentences);
        },
      );

      // 6. Generate Articles
      const generatedArticles = await step.run(
        'generate-articles',
        async () => {
          return dailyLessonService.generateArticle({
            domain,
            level,
            theme,
            vocabularyWords: targetWords,
            count: 3,
          });
        },
      );

      // 7. Save Articles to database (only if data is present)
      const savedArticles = await step.run(
        'save-articles-to-database',
        async () => {
          if (!generatedArticles?.length) {
            return [];
          }
          return dailyLessonService.saveArticlesToDatabase(generatedArticles);
        },
      );

      // 8. Save Daily Lesson to database (only if content is present)
      const vocabIds = (savedVocabs || []).map((v) => v._id);
      const sentenceIds = (savedSentences || []).map((s) => s._id);
      const articleIds = (savedArticles || []).map((a) => a._id);

      if (!vocabIds.length && !sentenceIds.length && !articleIds.length) {
        return {
          status: 'skipped',
          message: `No content was generated for ${domain}/${level} (day ${sequenceNumber}). Skipped.`,
        };
      }

      const savedLesson = await step.run('save-daily-lesson', async () => {
        return dailyLessonService.saveDailyLesson({
          sequenceNumber,
          domain,
          level,
          theme,
          vocabularies: vocabIds,
          sentences: sentenceIds,
          articles: articleIds,
        });
      });

      // 9. Send Notification to user (or dispatch notification event)
      await step.run('send-notification', () => {
        return {
          notified: true,
          message: `Daily lesson day ${sequenceNumber} generated for ${domain} (${level})`,
        };
      });

      return {
        status: 'success',
        lessonId: savedLesson._id.toString(),
        sequenceNumber,
        domain,
        level,
        theme,
      };
    },
  );

export const createScheduledDailyLessonFunction = (
  wordBankService: WordBankService,
  dailyLessonService: DailyLessonService,
) =>
  inngest.createFunction(
    {
      id: 'schedule-daily-lessons-at-4am',
      triggers: [
        {
          cron: 'TZ=Asia/Kolkata 0 4 * * *',
        },
        {
          event: 'speaktra/trigger-daily-lesson-scheduler',
        },
      ],
    },
    async ({ step }) => {
      // 1. Fetch list of all domains from speaktra-content (or fallback to Domain enum)
      const domains = await step.run('fetch-domains', async () => {
        return dailyLessonService.getAllDomains();
      });

      // 2. For each domain and level, verify that content exists in speaktra-content
      // Only add to target list if word bank content is present
      const targets = await step.run('calculate-next-sequences', async () => {
        const levels = Object.values(Level);
        const list: GenerateDailyLessonEventPayload[] = [];

        for (const domain of domains) {
          for (const level of levels) {
            const hasContent = await wordBankService.hasWordBank(domain, level);
            if (!hasContent) {
              continue;
            }

            const latestSeq = await dailyLessonService.getLatestSequenceNumber(
              domain,
              level,
            );
            list.push({
              domain,
              level,
              sequenceNumber: latestSeq + 1,
            });
          }
        }

        return list;
      });

      // 3. Dispatch generation events to generate lessons
      const events = targets.map((target) => ({
        name: 'speaktra/generate-daily-lesson' as const,
        data: target,
      }));

      if (events.length > 0) {
        await step.sendEvent('dispatch-daily-lesson-generations', events);
      }

      return {
        status: 'success',
        dispatchedCount: events.length,
        targets,
      };
    },
  );
