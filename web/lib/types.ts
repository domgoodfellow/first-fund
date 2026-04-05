export const APP_ROLES = ['client', 'admin'] as const
export type AppRole = (typeof APP_ROLES)[number]

export const APPLICATION_STATUSES = [
  'draft',
  'submitted',
  'under_review',
  'needs_documents',
  'approved',
  'declined',
] as const
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]

export const DOCUMENT_CATEGORIES = [
  'bank_statements',
  'government_id',
  'void_cheque',
  'incorporation_docs',
  'tax_returns',
  'financial_statements',
  'other_supporting_docs',
] as const
export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number]

export const APPLICATION_SECTION_KEYS = [
  'business_details',
  'business_address',
  'contact_details',
  'financial_profile',
] as const
export type ApplicationSectionKey = (typeof APPLICATION_SECTION_KEYS)[number]

export type JsonPrimitive = string | number | boolean | null
export type JsonRecord = Record<string, JsonPrimitive>

export interface Profile {
  id: string
  email: string
  role: AppRole
  language: 'en' | 'es'
  market: 'us' | 'ca'
  created_at?: string
  updated_at?: string
}

export interface ApplicationRecord {
  id: string
  client_profile_id: string
  status: ApplicationStatus
  stage: ApplicationSectionKey | 'documents' | 'review'
  assigned_admin_profile_id: string | null
  legal_business_name: string | null
  contact_name: string | null
  contact_email: string | null
  requested_amount: number | null
  funding_purpose: string | null
  submitted_at: string | null
  created_at?: string
  updated_at?: string
}

export interface ApplicationSectionRecord {
  id: string
  application_id: string
  section_key: ApplicationSectionKey
  data: JsonRecord
  is_complete: boolean
  completed_at: string | null
  created_at?: string
  updated_at?: string
}

export interface DocumentRecord {
  id: string
  application_id: string
  owner_profile_id: string
  category: DocumentCategory
  file_name: string
  storage_path: string
  mime_type: string | null
  size_bytes: number | null
  status: 'uploaded' | 'requested' | 'approved' | 'rejected'
  created_at?: string
}

export interface StatusHistoryRecord {
  id: string
  application_id: string
  previous_status: ApplicationStatus | null
  next_status: ApplicationStatus
  changed_by_profile_id: string | null
  note: string | null
  created_at?: string
}

export interface ApplicationNoteRecord {
  id: string
  application_id: string
  author_profile_id: string
  body: string
  created_at?: string
}

export interface LeadRequestRecord {
  id: string
  full_name: string
  business_name: string | null
  email: string
  phone: string
  funding_goal: string
  call_time: string
  notes: string | null
  created_at?: string
}

export interface ContactInquiryRecord {
  id: string
  full_name: string
  email: string
  phone: string | null
  subject: string
  message: string
  created_at?: string
}
