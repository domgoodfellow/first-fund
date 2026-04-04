'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Language } from '@/lib/i18n'

const langLabels: Record<Language, string> = { en: 'EN', es: 'ES' }
const availableLangs: Language[] = ['en', 'es']

const SERVICES_ABBRS: Record<string, string> = {
  '/services/invoice-factoring':     'IF',
  '/services/fixed-term-loans':      'FTL',
  '/services/line-of-credit':        'LOC',
  '/services/mortgage-loans':        'MTG',
  '/services/merchant-cash-advance': 'MCA',
  '/services/equipment-financing':   'EF',
}

interface NavItemProps {
  label: string
  href: string
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  onClick?: () => void
  children?: React.ReactNode
  dropdownNote?: string
  compareAll?: string
  serviceLinks?: ReadonlyArray<{ label: string; href: string }>
}

function NavItem({ label, href, isActive, onHover, onLeave, onClick, children, dropdownNote, compareAll, serviceLinks }: NavItemProps) {
  const [dropOpen, setDropOpen] = useState(false)
  const hasChildren = !!children
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const openDrop = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDropOpen(true)
  }
  const closeDrop = () => {
    timerRef.current = setTimeout(() => setDropOpen(false), 120)
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => { onHover(); if (hasChildren) openDrop() }}
      onMouseLeave={() => { onLeave(); if (hasChildren) closeDrop() }}
    >
      {hasChildren ? (
        <button
          onClick={() => setDropOpen((v) => !v)}
          className={`relative z-10 flex items-center gap-1 px-4 py-2 rounded-xl text-[15px] font-semibold transition-colors duration-150 ${
            isActive ? 'text-ff-accent' : 'text-ff-muted hover:text-ff-text'
          }`}
        >
          {label}
          <motion.svg
            animate={{ rotate: dropOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-3.5 h-3.5 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      ) : (
        <Link
          href={href}
          onClick={onClick}
          className={`relative z-10 flex items-center px-4 py-2 rounded-xl text-[15px] font-semibold transition-colors duration-150 ${
            isActive ? 'text-ff-accent' : 'text-ff-muted hover:text-ff-text'
          }`}
        >
          {label}
        </Link>
      )}

      {/* Dropdown panel */}
      {hasChildren && (
        <AnimatePresence>
          {dropOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={openDrop}
              onMouseLeave={closeDrop}
              className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[480px] bg-white border border-ff-border rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.12)] overflow-hidden z-50"
            >
              <div className="p-3 grid grid-cols-2 gap-1.5">
                {(serviceLinks ?? []).map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setDropOpen(false)}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-ff-raised transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-ff-raised border border-ff-border group-hover:bg-ff-brand-tint group-hover:border-ff-border-blue flex items-center justify-center text-ff-accent text-[10px] font-bold font-heading shrink-0 transition-colors">
                      {SERVICES_ABBRS[s.href]}
                    </span>
                    <span className="text-ff-text text-sm font-medium leading-tight group-hover:text-ff-accent transition-colors">
                      {s.label}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="border-t border-ff-border px-4 py-3 flex items-center justify-between bg-ff-surface">
                <span className="text-ff-muted text-xs">{dropdownNote}</span>
                <Link
                  href="/services"
                  onClick={() => setDropOpen(false)}
                  className="text-ff-accent text-xs font-semibold hover:underline"
                >
                  {compareAll}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const isApply  = pathname === '/apply'

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setMobileServicesOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {/* Floating card nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 pt-3 pb-1 pointer-events-none">
        <div className="pointer-events-auto bg-white/97 backdrop-blur-xl rounded-2xl border border-ff-border shadow-[0_4px_24px_rgba(15,23,42,0.09)] mx-auto max-w-[min(88vw,88rem)]">
          <div className="flex items-center justify-between h-[68px] px-4 sm:px-5">

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <span className="text-[1.65rem] font-heading font-extrabold text-ff-text tracking-tight leading-none">
                <span className="text-ff-accent">First</span>Fund
              </span>
            </Link>

            {/* Desktop nav — centered */}
            {!isApply && (
              <div className="hidden xl:flex items-center relative">
                {/* Sliding hover indicator */}
                <AnimatePresence>
                  {hoveredItem && (
                    <motion.div
                      layoutId="nav-card-bg"
                      className="absolute inset-0 bg-ff-raised rounded-xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>

                <NavItem
                  label={t.nav.about}
                  href="/about"
                  isActive={isActive('/about')}
                  onHover={() => setHoveredItem('about')}
                  onLeave={() => setHoveredItem(null)}
                />
                <NavItem
                  label={t.nav.services}
                  href="/services"
                  isActive={isActive('/services')}
                  onHover={() => setHoveredItem('services')}
                  onLeave={() => setHoveredItem(null)}
                  dropdownNote={t.nav.dropdownNote}
                  compareAll={t.nav.compareAll}
                  serviceLinks={t.footer.serviceLinks}
                >
                  {/* children presence triggers dropdown mode */}
                  <span />
                </NavItem>
                <NavItem
                  label={t.nav.faq}
                  href="/faq"
                  isActive={isActive('/faq')}
                  onHover={() => setHoveredItem('faq')}
                  onLeave={() => setHoveredItem(null)}
                />
                <NavItem
                  label={t.nav.contact}
                  href="/contact"
                  isActive={isActive('/contact')}
                  onHover={() => setHoveredItem('contact')}
                  onLeave={() => setHoveredItem(null)}
                />
              </div>
            )}

            {/* Right side */}
            <div className="hidden xl:flex items-center gap-3">
              {/* Language toggle */}
              <div className="flex items-center gap-0.5 bg-ff-surface border border-ff-border rounded-full p-1">
                {availableLangs.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
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
                    className="text-ff-text text-sm font-semibold border border-ff-border-strong px-4 py-2 rounded-xl hover:border-ff-accent hover:text-ff-accent transition-all"
                  >
                    {t.nav.bookACall}
                  </Link>
                  <Link
                    href="/apply"
                    className="bg-ff-accent text-white font-semibold text-sm px-5 py-2 rounded-xl hover:bg-ff-glow transition-all shadow-[0_1px_4px_rgba(30,64,175,0.35)]"
                  >
                    {t.nav.applyNow}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="xl:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-ff-surface border border-ff-border text-ff-muted hover:text-ff-text transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu — inside the card */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-ff-border"
              >
                <div className="px-4 py-5 flex flex-col gap-1.5">
                  {!isApply && (
                    <>
                      <Link
                        href="/about"
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive('/about') ? 'bg-ff-raised text-ff-accent' : 'text-ff-text hover:bg-ff-surface'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {t.nav.about}
                      </Link>

                      {/* Services accordion */}
                      <div>
                        <button
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive('/services') ? 'bg-ff-raised text-ff-accent' : 'text-ff-text hover:bg-ff-surface'}`}
                        >
                          {t.nav.services}
                          <motion.svg
                            animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </button>

                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden pl-3 mt-1 grid grid-cols-2 gap-1"
                            >
                              {t.footer.serviceLinks.map((s) => (
                                <Link
                                  key={s.href}
                                  href={s.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-ff-muted hover:text-ff-accent hover:bg-ff-raised text-xs font-medium transition-colors"
                                >
                                  <span className="text-ff-accent font-bold font-heading text-[10px]">{SERVICES_ABBRS[s.href]}</span>
                                  {s.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <Link
                        href="/faq"
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive('/faq') ? 'bg-ff-raised text-ff-accent' : 'text-ff-text hover:bg-ff-surface'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {t.nav.faq}
                      </Link>
                      <Link
                        href="/contact"
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive('/contact') ? 'bg-ff-raised text-ff-accent' : 'text-ff-text hover:bg-ff-surface'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {t.nav.contact}
                      </Link>
                    </>
                  )}

                  <div className="h-px bg-ff-border my-1" />

                  {/* Language */}
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-ff-muted text-xs font-medium">{t.nav.language}</span>
                    {availableLangs.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                          language === lang
                            ? 'bg-ff-accent text-white border-ff-accent'
                            : 'border-ff-border text-ff-muted hover:text-ff-text'
                        }`}
                      >
                        {langLabels[lang]}
                      </button>
                    ))}
                  </div>

                  {!isApply && (
                    <div className="flex gap-2 mt-1">
                      <Link
                        href="/book-a-call"
                        className="flex-1 border border-ff-border-strong text-ff-text font-semibold text-sm py-2.5 rounded-xl text-center hover:border-ff-accent hover:text-ff-accent transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {t.nav.bookACall}
                      </Link>
                      <Link
                        href="/apply"
                        className="flex-1 bg-ff-accent text-white font-semibold text-sm py-2.5 rounded-xl text-center hover:bg-ff-glow transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {t.nav.applyNow}
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Spacer so page content clears the floating nav */}
      <div className="navbar-spacer" aria-hidden="true" />
    </>
  )
}
