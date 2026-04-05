import { z } from 'zod'

export const contactInquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().max(32).optional().or(z.literal('')),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(2000),
  turnstileToken: z.string().trim().min(1),
})

export const leadRequestSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  businessName: z.string().trim().max(160).optional().or(z.literal('')),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(32),
  fundingGoal: z.string().trim().min(2).max(120),
  callTime: z.string().trim().min(2).max(120),
  notes: z.string().trim().max(2000).optional().or(z.literal('')),
  turnstileToken: z.string().trim().min(1),
})
