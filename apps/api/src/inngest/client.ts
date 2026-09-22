import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'speaktra',
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  isDev: process.env.NODE_ENV !== 'production',
});
