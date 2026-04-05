'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

interface PortalNavProps {
  email: string
}

export default function PortalNav({ email }: PortalNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()

  async function signOut() {
    const response = await fetch('/api/auth/sign-out', { method: 'POST' })
    const payload = await response.json()
    router.push(payload.redirectTo ?? '/sign-in')
    router.refresh()
  }

  const links = [
    { href: '/portal/dashboard', label: t.portal.nav.dashboard },
    { href: '/portal/application', label: t.portal.nav.application },
    { href: '/portal/documents', label: t.portal.nav.documents },
    { href: '/portal/messages', label: t.portal.nav.messages },
    { href: '/portal/settings', label: t.portal.nav.settings },
  ]

  return (
    <aside className="sticky top-0 flex min-h-screen flex-col border-r border-ff-border bg-white px-5 py-6">
      <Link href="/portal/dashboard" className="font-heading text-2xl font-extrabold text-ff-text">
        <span className="text-ff-accent">First</span>Fund
      </Link>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ff-muted">
        {t.portal.nav.portal}
      </p>

      <nav className="mt-8 flex flex-col gap-2">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-ff-raised text-ff-accent'
                  : 'text-ff-text hover:bg-ff-surface'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-ff-border bg-ff-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-muted">
          {t.portal.nav.account}
        </p>
        <p className="mt-2 text-sm text-ff-text">{email}</p>
        <button
          type="button"
          onClick={signOut}
          className="mt-4 text-sm font-semibold text-ff-accent hover:underline"
        >
          {t.portal.nav.signOut}
        </button>
      </div>
    </aside>
  )
}
