import type { ReactNode } from 'react'
import AdminNav from '@/components/layout/AdminNav'
import { requireAdminAccess } from '@/lib/auth/guards'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const context = await requireAdminAccess('/admin/applications')

  return (
    <div className="grid min-h-screen bg-slate-100 lg:grid-cols-[18rem,1fr]">
      <AdminNav email={context.profile?.email ?? context.user?.email ?? ''} />
      <main className="px-6 py-8 lg:px-10">{children}</main>
    </div>
  )
}
