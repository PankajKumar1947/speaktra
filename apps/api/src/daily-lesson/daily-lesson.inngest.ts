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
      const { theme, words } = await step.run(
        'get-words-from-word-bank',
        async () => {
          return wordBankService.getDailyWords(domain, level, sequenceNumber);
        },
      );

      // 2. Generate Vocabs
      const generatedVocabs = await step.run('generate-vocabs', async () => {
        return dailyLessonService.generateVocab({
          domain,
          level,
          theme,
          words,
        });
      });

      // 3. Save Vocabs to database
      const savedVocabs = await step.run(
        'save-vocabs-to-database',
        async () => {
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

      // 5. Save Sentence to database
      const savedSentences = await step.run(
        'save-sentences-to-database',
        async () => {
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

      // 7. Save Articles to database
      const savedArticles = await step.run(
        'save-articles-to-database',
        async () => {
          return dailyLessonService.saveArticlesToDatabase(generatedArticles);
        },
      );

      // 8. Save Daily Lesson to database
      const savedLesson = await step.run('save-daily-lesson', async () => {
        const vocabIds = savedVocabs.map((v) => v._id);
        const sentenceIds = savedSentences.map((s) => s._id);
        const articleIds = savedArticles.map((a) => a._id);

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
      await step.run('send-notification', async () => {
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
