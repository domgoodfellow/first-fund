import type { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import { redirectAuthenticatedUserFromAuth } from '@/lib/auth/guards'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  await redirectAuthenticatedUserFromAuth()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe,transparent_45%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-6 py-10">
      <Navbar />
      <div className="navbar-spacer" aria-hidden="true" />
      <div className="mx-auto flex min-h-[calc(100vh-var(--ff-navbar-offset)-2.5rem)] max-w-6xl items-center justify-center">
        {children}
      </div>
    </div>
  )
}
