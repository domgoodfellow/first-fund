import type { ReactNode } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import PortalNav from '@/components/layout/PortalNav'
import { requirePortalAccess } from '@/lib/auth/guards'

export default async function PortalLayout({
  children,
}: {
  children: ReactNode
}) {
  const context = await requirePortalAccess('/portal/dashboard')

  return (
    <LanguageProvider
      initialLanguage={context.profile?.language ?? 'en'}
      hydrateFromStorage={false}
    >
      <div className="grid min-h-screen bg-slate-50 lg:grid-cols-[18rem,1fr]">
        <PortalNav email={context.profile?.email ?? context.user?.email ?? ''} />
        <main className="px-6 py-8 lg:px-10">{children}</main>
      </div>
    </LanguageProvider>
  )
}
