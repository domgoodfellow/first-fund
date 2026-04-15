'use client'

import { useState } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)

  async function signOut() {
    const response = await fetch('/api/auth/sign-out', { method: 'POST' })
    const payload = await response.json()
    router.push(payload.redirectTo ?? '/sign-in')
    router.refresh()
  }

  const links = [
    { href: '/portal/dashboard', label: t.portal.nav.dashboard },
    { href: '/portal/application', label: t.portal.nav.application },
    { href: '/portal/messages', label: t.portal.nav.messages },
    { href: '/portal/settings', label: t.portal.nav.settings },
  ]

  function closeMenu() {
    setIsOpen(false)
  }

  const navLinks = (
    <nav className="mt-8 flex flex-col gap-2">
      {links.map((link) => {
        const active = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMenu}
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
  )

  const accountBlock = (
    <div className="mt-auto rounded-2xl border border-ff-border bg-ff-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-muted">
        {t.portal.nav.account}
      </p>
      <p className="mt-2 break-all text-sm text-ff-text">{email}</p>
      <button
        type="button"
        onClick={signOut}
        className="mt-4 text-sm font-semibold text-ff-accent hover:underline"
      >
        {t.portal.nav.signOut}
      </button>
    </div>
  )

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-ff-border bg-white px-4 py-4 lg:hidden">
        <div>
          <Link href="/portal/dashboard" className="font-heading text-2xl font-extrabold text-ff-text">
            <span className="text-ff-accent">First</span>Fund
          </Link>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ff-muted">
            {t.portal.nav.portal}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Toggle portal navigation"
          aria-expanded={isOpen}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-ff-border bg-white text-ff-text"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/35 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[18rem] flex-col border-r border-ff-border bg-white px-5 py-6 transition-transform duration-200 lg:sticky lg:top-0 lg:min-h-screen lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between gap-4 lg:block">
          <div>
            <Link
              href="/portal/dashboard"
              onClick={closeMenu}
              className="font-heading text-2xl font-extrabold text-ff-text"
            >
              <span className="text-ff-accent">First</span>Fund
            </Link>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ff-muted">
              {t.portal.nav.portal}
            </p>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close portal navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-ff-border text-ff-text lg:hidden"
          >
            X
          </button>
        </div>

        {navLinks}
        {accountBlock}
      </aside>
    </>
  )
}
