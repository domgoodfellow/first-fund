import { createServerSupabaseClient } from '@/lib/auth/server'
import { isSupabaseConfigured } from '@/lib/auth/config'
import type {
  ApplicationSectionKey,
  ApplicationStatus,
  JsonRecord,
} from '@/lib/types'

export async function saveApplicationSection(params: {
  applicationId: string
  sectionKey: ApplicationSectionKey
  data: JsonRecord
}) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.')
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('application_sections').upsert(
    {
      application_id: params.applicationId,
      section_key: params.sectionKey,
      data: params.data,
      is_complete: true,
      completed_at: new Date().toISOString(),
    },
    {
      onConflict: 'application_id,section_key',
    },
  )

  if (error) {
    throw error
  }

  const { error: applicationError } = await supabase
    .from('applications')
    .update({
      stage: params.sectionKey,
      legal_business_name:
        typeof params.data.companyName === 'string'
          ? params.data.companyName
          : undefined,
      contact_name:
        typeof params.data.fullName === 'string'
          ? params.data.fullName
          : undefined,
      contact_email:
        typeof params.data.email === 'string' ? params.data.email : undefined,
      funding_purpose:
        typeof params.data.fundingPurpose === 'string'
          ? params.data.fundingPurpose
          : undefined,
    })
    .eq('id', params.applicationId)

  if (applicationError) {
    throw applicationError
  }
}

export async function submitApplication(params: { applicationId: string }) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.')
  }

  const supabase = await createServerSupabaseClient()
  const now = new Date().toISOString()

  const { data: current } = await supabase
    .from('applications')
    .select('status')
    .eq('id', params.applicationId)
    .maybeSingle()

  const previousStatus = (current?.status as ApplicationStatus | undefined) ?? null

  const { error } = await supabase
    .from('applications')
    .update({
      status: 'submitted',
      stage: 'review',
      submitted_at: now,
    })
    .eq('id', params.applicationId)

  if (error) {
    throw error
  }

  await supabase.from('status_history').insert({
    application_id: params.applicationId,
    previous_status: previousStatus,
    next_status: 'submitted',
    note: 'Client submitted application.',
  })
}

export async function createLeadRequest(payload: {
  full_name: string
  business_name: string | null
  email: string
  phone: string
  funding_goal: string
  call_time: string
  notes: string | null
}) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.')
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('lead_requests').insert(payload)

  if (error) {
    throw error
  }
}

export async function createContactInquiry(payload: {
  full_name: string
  email: string
  phone: string | null
  subject: string
  message: string
}) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.')
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('contact_inquiries').insert(payload)

  if (error) {
    throw error
  }
}

export async function completeDocumentUpload(payload: {
  application_id: string
  owner_profile_id: string
  category: string
  file_name: string
  storage_path: string
  mime_type: string
  size_bytes: number
}) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.')
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('documents').insert({
    ...payload,
    status: 'uploaded',
  })

  if (error) {
    throw error
  }
}

export async function updateClientSettings(params: {
  userId: string
  language: 'en' | 'es'
  market: 'us' | 'ca'
}) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.')
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('profiles')
    .update({
      language: params.language,
      market: params.market,
    })
    .eq('id', params.userId)

  if (error) {
    throw error
  }
}

export async function createApplicationNote(params: {
  applicationId: string
  authorProfileId: string
  body: string
}) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.')
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('application_notes').insert({
    application_id: params.applicationId,
    author_profile_id: params.authorProfileId,
    body: params.body,
  })

  if (error) {
    throw error
  }
}

/**
 * Appends an entry to the activity_logs table.
 * Errors are non-fatal — call sites should not throw on failure.
 */
export async function logActivity(params: {
  applicationId: string
  actorId: string
  action: string
  metadata?: Record<string, unknown>
}): Promise<void> {
  if (!isSupabaseConfigured()) return

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('activity_logs').insert({
    application_id: params.applicationId,
    actor_profile_id: params.actorId,
    action: params.action,
    metadata: params.metadata ?? null,
  })

  if (error) {
    console.error('[logActivity] failed to write activity log:', error)
  }
}

/**
 * Updates the scan_status of a document after a virus scan completes.
 */
export async function updateDocumentScanStatus(params: {
  storagePath: string
  scanStatus: 'pending' | 'clean' | 'quarantined'
}): Promise<void> {
  if (!isSupabaseConfigured()) return

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('documents')
    .update({ scan_status: params.scanStatus })
    .eq('storage_path', params.storagePath)

  if (error) {
    console.error('[updateDocumentScanStatus] failed:', error)
  }
}

export async function changeApplicationStatus(params: {
  applicationId: string
  changedByProfileId: string
  status: ApplicationStatus
  note?: string | null
}) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.')
  }

  const supabase = await createServerSupabaseClient()
  const { data: current } = await supabase
    .from('applications')
    .select('status')
    .eq('id', params.applicationId)
    .maybeSingle()

  const { error } = await supabase
    .from('applications')
    .update({
      status: params.status,
      stage: params.status === 'needs_documents' ? 'documents' : 'review',
    })
    .eq('id', params.applicationId)

  if (error) {
    throw error
  }

  const { error: historyError } = await supabase.from('status_history').insert({
    application_id: params.applicationId,
    previous_status: current?.status ?? null,
    next_status: params.status,
    changed_by_profile_id: params.changedByProfileId,
    note: params.note ?? null,
  })

  if (historyError) {
    throw historyError
  }
}
