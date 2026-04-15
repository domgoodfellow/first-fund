import { createAdminSupabaseClientOrNull } from '@/lib/auth/server'
import {
  ChatMessage,
  ChatRole,
  getChatRetentionDays,
  MAX_CHAT_HISTORY_MESSAGES,
} from '@/lib/chat/config'

function withTimeout<T>(operation: PromiseLike<T>, fallback: T): Promise<T> {
  return Promise.race([
    Promise.resolve(operation).catch((error) => {
      console.warn('[chat] persistence skipped:', error)
      return fallback
    }),
    new Promise<T>((resolve) => {
      setTimeout(() => resolve(fallback), 2_000)
    }),
  ])
}

function getExpiryIso() {
  return new Date(Date.now() + getChatRetentionDays() * 24 * 60 * 60 * 1000).toISOString()
}

export async function persistChatSession(params: {
  sessionId: string
  mode: string
  pageUrl?: string
  userId?: string | null
}) {
  const supabase = createAdminSupabaseClientOrNull()
  if (!supabase) return

  await withTimeout(
    supabase.from('chat_sessions').upsert(
      {
        id: params.sessionId,
        user_id: params.userId ?? null,
        mode: params.mode,
        metadata: { pageUrl: params.pageUrl ?? null },
        expires_at: getExpiryIso(),
      },
      { onConflict: 'id' },
    ),
    null,
  )
}

export async function loadChatHistory(sessionId: string): Promise<ChatMessage[]> {
  const supabase = createAdminSupabaseClientOrNull()
  if (!supabase) return []

  const { data } = await withTimeout<any>(
    supabase
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(MAX_CHAT_HISTORY_MESSAGES),
    { data: null },
  )

  return (data ?? [])
    .filter((message: { role?: string; content?: string }): message is ChatMessage => {
      return (
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string'
      )
    })
    .map((message: ChatMessage) => ({
      role: message.role,
      content: message.content,
    }))
}

export async function persistChatMessage(
  sessionId: string,
  role: ChatRole,
  content: string,
) {
  const supabase = createAdminSupabaseClientOrNull()
  if (!supabase) return

  await withTimeout(
    supabase.from('chat_messages').insert({
      session_id: sessionId,
      role,
      content,
    }),
    null,
  )
}

export async function persistChatEscalation(sessionId: string, reason: string) {
  const supabase = createAdminSupabaseClientOrNull()
  if (!supabase) return

  await withTimeout(
    supabase.from('chat_escalations').insert({
      session_id: sessionId,
      reason,
      status: 'open',
    }),
    null,
  )
}
