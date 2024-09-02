import {z} from 'zod';

const NotificationSettings = z.object({
  submissionWindowClose: z.boolean(),
  submissionWindowOpen: z.boolean(),
  submissionProcessed: z.boolean(),
  submissionSummaryReady: z.boolean(),
  extractCanBeDownloaded: z.boolean(),
  midWindowClose: z.boolean(),
});

type TNotificationSettings = z.infer<typeof NotificationSettings>;

export {NotificationSettings};
export type {TNotificationSettings};
