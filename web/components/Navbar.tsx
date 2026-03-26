'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCountry, countryLanguages, Country } from '@/contexts/CountryContext'
import { Language } from '@/lib/i18n'

const langLabels: Record<Language, string> = { en: 'EN', fr: 'FR', es: 'ES' }

export default function Navbar() {
  const { country, setCountry, language, setLanguage, t } = useCountry()
  const [menuOpen, setMenuOpen] = useState(false)
  const availableLangs = countryLanguages[country]

  const handleCountryChange = (c: Country) => {
    setCountry(c)
    setMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ff-bg/95 backdrop-blur-md border-b border-ff-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-xl font-heading font-extrabold text-white tracking-tight">
                {country === 'US' ? (
                  <><span className="text-ff-accent">Firs</span>Fund</>
                ) : (
                  <><span className="text-ff-accent">Next</span>Fund</>
                )}
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/#services" className="text-ff-muted hover:text-white transition-colors text-sm font-medium">
                {t.nav.services}
              </Link>
              <Link href="/#how-it-works" className="text-ff-muted hover:text-white transition-colors text-sm font-medium">
                {t.nav.howItWorks}
              </Link>
              <Link href="/#testimonials" className="text-ff-muted hover:text-white transition-colors text-sm font-medium">
                {t.nav.stories}
              </Link>

              {/* Language toggle */}
              <div className="flex items-center gap-1 bg-ff-surface border border-ff-border rounded-full p-1">
                {availableLangs.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                      language === lang
                        ? 'bg-ff-accent text-ff-bg'
                        : 'text-ff-muted hover:text-white'
                    }`}
                  >
                    {langLabels[lang]}
                  </button>
                ))}
              </div>

              {/* Country toggle */}
              <div className="flex items-center gap-1 bg-ff-surface border border-ff-border rounded-full p-1">
                <button
                  onClick={() => handleCountryChange('US')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                    country === 'US' ? 'bg-ff-accent text-ff-bg' : 'text-ff-muted hover:text-white'
                  }`}
                >
                  🇺🇸 USD
                </button>
                <button
                  onClick={() => handleCountryChange('CA')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                    country === 'CA' ? 'bg-ff-accent text-ff-bg' : 'text-ff-muted hover:text-white'
                  }`}
                >
                  🇨🇦 CAD
                </button>
              </div>

              <Link
                href="/apply"
                className="bg-ff-accent text-ff-bg font-semibold text-sm px-5 py-2 rounded-full hover:bg-ff-glow transition-colors animate-pulse-glow"
              >
                {t.nav.applyNow}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-ff-muted hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-ff-surface border-t border-ff-border overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col gap-4">
                <Link href="/#services" className="text-ff-muted hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                  {t.nav.services}
                </Link>
                <Link href="/#how-it-works" className="text-ff-muted hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                  {t.nav.howItWorks}
                </Link>
                <Link href="/#testimonials" className="text-ff-muted hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                  {t.nav.stories}
                </Link>

                {/* Language */}
                <div className="flex items-center gap-2">
                  <span className="text-ff-muted text-xs">Lang:</span>
                  {availableLangs.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                        language === lang
                          ? 'bg-ff-accent text-ff-bg border-ff-accent'
                          : 'border-ff-border text-ff-muted hover:text-white'
                      }`}
                    >
                      {langLabels[lang]}
                    </button>
                  ))}
                </div>

                {/* Country */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCountryChange('US')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      country === 'US' ? 'bg-ff-accent text-ff-bg border-ff-accent' : 'border-ff-border text-ff-muted'
                    }`}
                  >
                    🇺🇸 USD
                  </button>
                  <button
                    onClick={() => handleCountryChange('CA')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      country === 'CA' ? 'bg-ff-accent text-ff-bg border-ff-accent' : 'border-ff-border text-ff-muted'
                    }`}
                  >
                    🇨🇦 CAD
                  </button>
                </div>

                <Link
                  href="/apply"
                  className="bg-ff-accent text-ff-bg font-semibold text-sm px-5 py-2.5 rounded-full text-center hover:bg-ff-glow transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav.applyNow}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </nav>
  )
}
