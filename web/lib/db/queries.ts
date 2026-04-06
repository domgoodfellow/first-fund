import { createServerSupabaseClient } from '@/lib/auth/server'
import { isSupabaseConfigured } from '@/lib/auth/config'
import type {
  ApplicationNoteRecord,
  ApplicationRecord,
  ApplicationSectionRecord,
  DocumentRecord,
  Profile,
  StatusHistoryRecord,
} from '@/lib/types'

export async function getProfileById(id: string) {
  if (!isSupabaseConfigured()) return null

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('profiles')
    .select('id, email, role, language, market, created_at, updated_at')
    .eq('id', id)
    .maybeSingle()

  return (data as Profile | null) ?? null
}

export async function getOrCreateApplicationForClient(userId: string) {
  if (!isSupabaseConfigured()) return null

  const supabase = await createServerSupabaseClient()
  const { data: existing } = await supabase
    .from('applications')
    .select('*')
    .eq('client_profile_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (existing) {
    return existing as ApplicationRecord
  }

  const { data: created, error } = await supabase
    .from('applications')
    .insert({
      client_profile_id: userId,
      status: 'draft',
      stage: 'business_details',
      contact_email: null,
    })
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return created as ApplicationRecord
}

export async function getApplicationSections(applicationId: string) {
  if (!isSupabaseConfigured()) return [] as ApplicationSectionRecord[]

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('application_sections')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: true })

  return (data as ApplicationSectionRecord[] | null) ?? []
}

export async function getApplicationDocuments(applicationId: string) {
  if (!isSupabaseConfigured()) return [] as DocumentRecord[]

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('documents')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false })

  return (data as DocumentRecord[] | null) ?? []
}

export async function getApplicationStatusHistory(applicationId: string) {
  if (!isSupabaseConfigured()) return [] as StatusHistoryRecord[]

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('status_history')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: true })

  return (data as StatusHistoryRecord[] | null) ?? []
}

export async function getAdminApplicationNotes(applicationId: string) {
  if (!isSupabaseConfigured()) return [] as ApplicationNoteRecord[]

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('application_notes')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false })

  return (data as ApplicationNoteRecord[] | null) ?? []
}

export async function getPortalDashboard(userId: string) {
  const application = await getOrCreateApplicationForClient(userId)

  if (!application) {
    return {
      application: null,
      documents: [] as DocumentRecord[],
      history: [] as StatusHistoryRecord[],
      sections: [] as ApplicationSectionRecord[],
    }
  }

  const [documents, history, sections] = await Promise.all([
    getApplicationDocuments(application.id),
    getApplicationStatusHistory(application.id),
    getApplicationSections(application.id),
  ])

  return {
    application,
    documents,
    history,
    sections,
  }
}

export async function getAdminApplications() {
  if (!isSupabaseConfigured()) return [] as ApplicationRecord[]

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  return (data as ApplicationRecord[] | null) ?? []
}

export async function getAdminApplicationDetail(applicationId: string) {
  if (!isSupabaseConfigured()) {
    return {
      application: null,
      clientProfile: null,
      documents: [] as DocumentRecord[],
      sections: [] as ApplicationSectionRecord[],
      notes: [] as ApplicationNoteRecord[],
      history: [] as StatusHistoryRecord[],
    }
  }

  const supabase = await createServerSupabaseClient()
  const { data: application } = await supabase
    .from('applications')
    .select('*')
    .eq('id', applicationId)
    .maybeSingle()

  if (!application) {
    return {
      application: null,
      clientProfile: null,
      documents: [] as DocumentRecord[],
      sections: [] as ApplicationSectionRecord[],
      notes: [] as ApplicationNoteRecord[],
      history: [] as StatusHistoryRecord[],
    }
  }

  const [clientProfile, documents, sections, notes, history] = await Promise.all([
    getProfileById(application.client_profile_id),
    getApplicationDocuments(applicationId),
    getApplicationSections(applicationId),
    getAdminApplicationNotes(applicationId),
    getApplicationStatusHistory(applicationId),
  ])

  return {
    application: application as ApplicationRecord,
    clientProfile,
    documents,
    sections,
    notes,
    history,
  }
}

export async function getAdminClients() {
  if (!isSupabaseConfigured()) return [] as Profile[]

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('profiles')
    .select('id, email, role, language, market, created_at, updated_at')
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  return (data as Profile[] | null) ?? []
}

export async function getAdminDocuments() {
  if (!isSupabaseConfigured()) return [] as DocumentRecord[]

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false })

  return (data as DocumentRecord[] | null) ?? []
}

export async function getAdminNotes() {
  if (!isSupabaseConfigured()) return [] as ApplicationNoteRecord[]

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('application_notes')
    .select('*')
    .order('created_at', { ascending: false })

  return (data as ApplicationNoteRecord[] | null) ?? []
}

/**
 * Returns true if the given application belongs to the given user.
 * Used by API routes to enforce ownership before allowing mutations.
 */
export async function applicationBelongsToUser(
  applicationId: string,
  userId: string,
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('applications')
    .select('id')
    .eq('id', applicationId)
    .eq('client_profile_id', userId)
    .maybeSingle()

  return data !== null
}

/**
 * Returns the document row for the given storage path, or null if not found.
 * Used by the signed-url route to verify ownership and check scan_status.
 */
export async function getDocumentByStoragePath(storagePath: string) {
  if (!isSupabaseConfigured()) return null

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('documents')
    .select('id, application_id, owner_profile_id, scan_status')
    .eq('storage_path', storagePath)
    .maybeSingle()

  return data as {
    id: string
    application_id: string
    owner_profile_id: string
    scan_status: 'pending' | 'clean' | 'quarantined'
  } | null
}
