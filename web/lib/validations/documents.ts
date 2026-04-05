import { z } from 'zod'
import { DOCUMENT_CATEGORIES } from '@/lib/types'

export const uploadSignSchema = z.object({
  applicationId: z.string().uuid(),
  category: z.enum(DOCUMENT_CATEGORIES),
  fileName: z.string().trim().min(1).max(255),
  mimeType: z.string().trim().min(1).max(120),
  sizeBytes: z.number().int().positive().max(20 * 1024 * 1024),
})

export const uploadCompleteSchema = uploadSignSchema.extend({
  storagePath: z.string().trim().min(1).max(512),
})

export const signedUrlSchema = z.object({
  storagePath: z.string().trim().min(1).max(512),
})
