import { z } from 'zod'
import { APPLICATION_SECTION_KEYS } from '@/lib/types'

const sectionDataValue = z.union([z.string(), z.number(), z.boolean(), z.null()])

export const saveApplicationSectionSchema = z.object({
  sectionKey: z.enum(APPLICATION_SECTION_KEYS),
  data: z.record(z.string(), sectionDataValue),
})

export const submitApplicationSchema = z.object({
  applicationId: z.string().uuid(),
})

export const adminNoteSchema = z.object({
  applicationId: z.string().uuid(),
  body: z.string().trim().min(3).max(2000),
})

export const statusChangeSchema = z.object({
  applicationId: z.string().uuid(),
  status: z.enum([
    'draft',
    'submitted',
    'under_review',
    'needs_documents',
    'approved',
    'declined',
  ]),
  note: z.string().trim().max(500).optional().or(z.literal('')),
})

export const profileSettingsSchema = z.object({
  language: z.enum(['en', 'es']),
  market: z.enum(['us', 'ca']),
})
