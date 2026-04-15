import { z } from 'zod'

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(2_000),
  sessionId: z.string().uuid(),
  pageUrl: z.string().url().max(1_024).optional(),
})
