'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Language } from '@/lib/i18n'
import { getHomeFunnelContent } from '@/lib/home-funnel'

const langLabels: Record<Language, string> = { en: 'EN', es: 'ES' }
const availableLangs: Language[] = ['en', 'es']

const SERVICES_ABBRS: Record<string, string> = {
  '/services/invoice-factoring': 'IF',
  '/services/fixed-term-loans': 'FTL',
  '/services/line-of-credit': 'LOC',
  '/services/mortgage-loans': 'MTG',
  '/services/merchant-cash-advance': 'MCA',
  '/services/equipment-financing': 'EF',
}

function DesktopProductsDropdown({
  label,
  note,
  compareAll,
  serviceLinks,
}: {
  label: string
  note: string
  compareAll: string
  serviceLinks: ReadonlyArray<{ label: string; href: string }>
}) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const openMenu = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setOpen(true)
  }

  const closeMenu = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <Link
        href="/#products"
        className="flex items-center gap-1 rounded-xl px-4 py-2 text-[15px] font-semibold text-ff-muted transition-colors hover:text-ff-text"
      >
        {label}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="h-3.5 w-3.5 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
            className="absolute left-1/2 top-[calc(100%+8px)] z-50 w-[520px] -translate-x-1/2 overflow-hidden rounded-2xl border border-ff-border bg-white shadow-[0_8px_32px_rgba(15,23,42,0.12)]"
          >
            <div className="grid grid-cols-2 gap-2 p-3">
              {serviceLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-ff-raised"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-ff-border bg-ff-surface text-[10px] font-bold text-ff-accent transition-colors group-hover:border-ff-border-blue group-hover:bg-ff-brand-tint">
                    {SERVICES_ABBRS[service.href]}
                  </span>
                  <span className="text-sm font-medium leading-tight text-ff-text transition-colors group-hover:text-ff-accent">
                    {service.label}
                  </span>
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-ff-border bg-ff-surface px-4 py-3">
              <span className="text-xs text-ff-muted">{note}</span>
              <Link href="/services" onClick={() => setOpen(false)} className="text-xs font-semibold text-ff-accent hover:underline">
                {compareAll}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const funnel = getHomeFunnelContent(language)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const isApply = pathname === '/apply'

  useEffect(() => {
    setMenuOpen(false)
    setMobileProductsOpen(false)
  }, [pathname])

  const homeHash = (hash: string) => (pathname === '/' ? hash : `/${hash}`)

  return (
    <>
      <nav className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 pb-1 pt-3 sm:px-5">
        <div className="pointer-events-auto mx-auto max-w-[min(88vw,88rem)] rounded-2xl border border-ff-border bg-white shadow-[0_4px_24px_rgba(15,23,42,0.09)]">
          <div className="flex h-[68px] items-center justify-between px-4 sm:px-5">
            <Link href="/" className="shrink-0">
              <span className="text-[1.65rem] font-heading font-extrabold leading-none tracking-tight text-ff-text">
                <span className="text-ff-accent">First</span> Fund
              </span>
            </Link>

            {!isApply && (
              <div className="hidden xl:flex items-center">
                <DesktopProductsDropdown
                  label={funnel.nav.products}
                  note={funnel.nav.productsNote}
                  compareAll={funnel.nav.compareAll}
                  serviceLinks={t.footer.serviceLinks}
                />
                <Link
                  href={homeHash('#how-it-works')}
                  className="rounded-xl px-4 py-2 text-[15px] font-semibold text-ff-muted transition-colors hover:text-ff-text"
                >
                  {funnel.nav.howItWorks}
                </Link>
                <Link
                  href={homeHash('#faq')}
                  className="rounded-xl px-4 py-2 text-[15px] font-semibold text-ff-muted transition-colors hover:text-ff-text"
                >
                  {funnel.nav.faq}
                </Link>
              </div>
            )}

            <div className="hidden xl:flex items-center gap-3">
              <div className="flex items-center gap-0.5 rounded-full border border-ff-border bg-ff-surface p-1">
                {availableLangs.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                      language === lang
                        ? 'bg-ff-accent text-white shadow-sm'
                        : 'text-ff-muted hover:text-ff-text'
                    }`}
                  >
                    {langLabels[lang]}
                  </button>
                ))}
              </div>

              {!isApply && (
                <>
                  <Link
                    href="/book-a-call"
                    className="rounded-xl border border-ff-border-strong px-4 py-2 text-sm font-semibold text-ff-text transition-all hover:border-ff-accent hover:text-ff-accent"
                  >
                    {funnel.nav.bookCall}
                  </Link>
                  <Link
                    href="/apply"
                    className="rounded-xl bg-ff-accent px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-ff-glow shadow-[0_1px_4px_rgba(30,64,175,0.35)]"
                  >
                    {funnel.nav.applyNow}
                  </Link>
                </>
              )}
            </div>

            <button
              className="xl:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-ff-border bg-ff-surface text-ff-muted transition-colors hover:text-ff-text"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-ff-border"
              >
                <div className="flex flex-col gap-1.5 px-4 py-5">
                  {!isApply && (
                    <>
                      <Link
                        href="/#products"
                        className="rounded-xl px-4 py-2.5 text-sm font-semibold text-ff-text transition-colors hover:bg-ff-surface"
                        onClick={() => setMenuOpen(false)}
                      >
                        {funnel.nav.products}
                      </Link>

                      <button
                        onClick={() => setMobileProductsOpen((current) => !current)}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-ff-text transition-colors hover:bg-ff-surface"
                      >
                        <span>{language === 'en' ? 'All service pages' : 'Todas las paginas de servicio'}</span>
                        <motion.svg
                          animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>

                      <AnimatePresence>
                        {mobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="grid grid-cols-2 gap-1 overflow-hidden pl-3"
                          >
                            {t.footer.serviceLinks.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-ff-muted transition-colors hover:bg-ff-raised hover:text-ff-accent"
                              >
                                <span className="text-[10px] font-bold text-ff-accent">
                                  {SERVICES_ABBRS[service.href]}
                                </span>
                                {service.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Link
                        href={homeHash('#how-it-works')}
                        className="rounded-xl px-4 py-2.5 text-sm font-semibold text-ff-text transition-colors hover:bg-ff-surface"
                        onClick={() => setMenuOpen(false)}
                      >
                        {funnel.nav.howItWorks}
                      </Link>
                      <Link
                        href={homeHash('#faq')}
                        className="rounded-xl px-4 py-2.5 text-sm font-semibold text-ff-text transition-colors hover:bg-ff-surface"
                        onClick={() => setMenuOpen(false)}
                      >
                        {funnel.nav.faq}
                      </Link>
                    </>
                  )}

                  <div className="my-1 h-px bg-ff-border" />

                  <div className="flex items-center gap-2 px-2">
                    <span className="text-xs font-medium text-ff-muted">{funnel.nav.language}</span>
                    {availableLangs.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                          language === lang
                            ? 'border-ff-accent bg-ff-accent text-white'
                            : 'border-ff-border text-ff-muted hover:text-ff-text'
                        }`}
                      >
                        {langLabels[lang]}
                      </button>
                    ))}
                  </div>

                  {!isApply && (
                    <div className="mt-1 flex gap-2">
                      <Link
                        href="/book-a-call"
                        className="flex-1 rounded-xl border border-ff-border-strong py-2.5 text-center text-sm font-semibold text-ff-text transition-colors hover:border-ff-accent hover:text-ff-accent"
                        onClick={() => setMenuOpen(false)}
                      >
                        {funnel.nav.bookCall}
                      </Link>
                      <Link
                        href="/apply"
                        className="flex-1 rounded-xl bg-ff-accent py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-ff-glow"
                        onClick={() => setMenuOpen(false)}
                      >
                        {funnel.nav.applyNow}
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="navbar-spacer" aria-hidden="true" />
    </>
  )
}
