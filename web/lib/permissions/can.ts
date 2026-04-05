import type { AppRole } from '@/lib/types'

export function isAdmin(role: AppRole | null | undefined) {
  return role === 'admin'
}

export function canAccessPortal(role: AppRole | null | undefined) {
  return role === 'client' || role === 'admin'
}

export function canAccessAdmin(role: AppRole | null | undefined) {
  return role === 'admin'
}
