import type { ReactNode } from 'react'
import { redirectAuthenticatedUserFromAuth } from '@/lib/auth/guards'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  await redirectAuthenticatedUserFromAuth()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe,transparent_45%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        {children}
      </div>
    </div>
  )
}
