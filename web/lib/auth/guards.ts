import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '@/lib/auth/server'
import { getDefaultClientLanguage, isSupabaseConfigured } from '@/lib/auth/config'
import type { AppRole, Profile } from '@/lib/types'
import { canAccessAdmin, canAccessPortal } from '@/lib/permissions/can'

export interface AuthContext {
  user: User | null
  profile: Profile | null
  isConfigured: boolean
}

async function getProfileForUser(user: User): Promise<Profile | null> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('profiles')
    .select('id, email, role, language, market, created_at, updated_at')
    .eq('id', user.id)
    .maybeSingle()

  if (!data) {
    return {
      id: user.id,
      email: user.email ?? '',
      role: 'client',
      language: getDefaultClientLanguage(user.user_metadata?.language),
      market: user.user_metadata?.market === 'ca' ? 'ca' : 'us',
    }
  }

  return {
    ...data,
    language: getDefaultClientLanguage(data.language),
    market: data.market === 'ca' ? 'ca' : 'us',
  } as Profile
}

export async function getAuthContext(): Promise<AuthContext> {
  if (!isSupabaseConfigured()) {
    return {
      user: null,
      profile: null,
      isConfigured: false,
    }
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      user: null,
      profile: null,
      isConfigured: true,
    }
  }

  return {
    user,
    profile: await getProfileForUser(user),
    isConfigured: true,
  }
}

export function getPostAuthRedirect(role: AppRole | null | undefined) {
  return role === 'admin' ? '/admin/applications' : '/portal/dashboard'
}

export async function requireAuthenticatedUser(next?: string) {
  const context = await getAuthContext()

  if (!context.user) {
    const redirectTarget = next
      ? `/sign-in?next=${encodeURIComponent(next)}`
      : '/sign-in'
    redirect(redirectTarget)
  }

  return context
}

export async function requirePortalAccess(next: string) {
  const context = await requireAuthenticatedUser(next)

  if (!canAccessPortal(context.profile?.role)) {
    redirect('/sign-in')
  }

  return context
}

export async function requireAdminAccess(next: string) {
  const context = await requireAuthenticatedUser(next)

  if (!canAccessAdmin(context.profile?.role)) {
    redirect('/portal/dashboard')
  }

  return context
}

export async function redirectAuthenticatedUserFromAuth() {
  const context = await getAuthContext()

  if (context.user) {
    redirect(getPostAuthRedirect(context.profile?.role))
  }
}
