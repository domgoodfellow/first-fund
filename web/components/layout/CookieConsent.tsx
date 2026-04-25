'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

type CookiePreferences = {
  necessary: true
  analytics: boolean
  marketing: boolean
  savedAt: string
}

const STORAGE_KEY = 'ff_cookie_preferences'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const copy = {
  en: {
    heading: 'Cookie preferences',
    message:
      'We use necessary cookies to run the site. You can also allow analytics and marketing cookies to help us improve the website and measure campaigns.',
    necessary: 'Necessary',
    necessaryDesc: 'Required for security, forms, preferences, and core site functionality.',
    analytics: 'Analytics',
    analyticsDesc: 'Helps us understand site usage and improve the experience.',
    marketing: 'Marketing',
    marketingDesc: 'Helps measure campaign performance and relevant outreach.',
    customize: 'Customize',
    acceptNecessary: 'Necessary only',
    acceptAll: 'Accept all',
    save: 'Save choices',
    on: 'On',
  },
  es: {
    heading: 'Preferencias de cookies',
    message:
      'Usamos cookies necesarias para operar el sitio. Tambien puedes permitir cookies de analitica y marketing para ayudarnos a mejorar el sitio y medir campanas.',
    necessary: 'Necesarias',
    necessaryDesc: 'Requeridas para seguridad, formularios, preferencias y funciones basicas del sitio.',
    analytics: 'Analitica',
    analyticsDesc: 'Nos ayuda a entender el uso del sitio y mejorar la experiencia.',
    marketing: 'Marketing',
    marketingDesc: 'Ayuda a medir el rendimiento de campanas y comunicaciones relevantes.',
    customize: 'Personalizar',
    acceptNecessary: 'Solo necesarias',
    acceptAll: 'Aceptar todo',
    save: 'Guardar opciones',
    on: 'Activas',
  },
} as const

function persistPreferences(preferences: CookiePreferences) {
  const value = encodeURIComponent(JSON.stringify(preferences))
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  document.cookie = `${STORAGE_KEY}=${value}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`
}

function buildPreferences(options: Omit<CookiePreferences, 'necessary' | 'savedAt'>): CookiePreferences {
  return {
    necessary: true,
    analytics: options.analytics,
    marketing: options.marketing,
    savedAt: new Date().toISOString(),
  }
}

export default function CookieConsent() {
  const { language } = useLanguage()
  const t = copy[language]

  const [visible, setVisible] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    setVisible(!window.localStorage.getItem(STORAGE_KEY))
  }, [])

  function save(options: { analytics: boolean; marketing: boolean }) {
    persistPreferences(buildPreferences(options))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <section
      aria-label={t.heading}
      className="fixed inset-x-4 bottom-4 z-[60] rounded-2xl border border-ff-border bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.18)] sm:left-6 sm:right-auto sm:max-w-xl lg:bottom-6"
    >
      <div className="flex items-start gap-4">
        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ff-raised text-ff-accent sm:flex">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M7 8h.01M12 7h.01M15 12h.01M9.5 14.5h.01M20 12a8 8 0 1 1-8-8c.1 2.9 1.6 4.4 4.5 4.5.1 2.2 1.3 3.4 3.5 3.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-lg font-bold text-ff-text">{t.heading}</h2>
          <p className="mt-2 text-sm leading-6 text-ff-muted">{t.message}</p>

          {customizing ? (
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-ff-border bg-ff-surface px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ff-text">{t.necessary}</p>
                    <p className="mt-1 text-xs leading-5 text-ff-muted">{t.necessaryDesc}</p>
                  </div>
                  <span className="rounded-full bg-ff-brand-tint px-3 py-1 text-xs font-semibold text-ff-accent">
                    {t.on}
                  </span>
                </div>
              </div>

              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-ff-border bg-white px-4 py-3">
                <span>
                  <span className="block text-sm font-semibold text-ff-text">{t.analytics}</span>
                  <span className="mt-1 block text-xs leading-5 text-ff-muted">{t.analyticsDesc}</span>
                </span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-ff-border accent-ff-accent"
                />
              </label>

              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-ff-border bg-white px-4 py-3">
                <span>
                  <span className="block text-sm font-semibold text-ff-text">{t.marketing}</span>
                  <span className="mt-1 block text-xs leading-5 text-ff-muted">{t.marketingDesc}</span>
                </span>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-ff-border accent-ff-accent"
                />
              </label>
            </div>
          ) : null}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
            {customizing ? (
              <button
                type="button"
                onClick={() => save({ analytics, marketing })}
                className="rounded-xl bg-ff-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ff-glow"
              >
                {t.save}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setCustomizing(true)}
                  className="rounded-xl border border-ff-border px-4 py-2.5 text-sm font-semibold text-ff-text transition-colors hover:border-ff-accent hover:text-ff-accent"
                >
                  {t.customize}
                </button>
                <button
                  type="button"
                  onClick={() => save({ analytics: false, marketing: false })}
                  className="rounded-xl border border-ff-border px-4 py-2.5 text-sm font-semibold text-ff-text transition-colors hover:border-ff-accent hover:text-ff-accent"
                >
                  {t.acceptNecessary}
                </button>
                <button
                  type="button"
                  onClick={() => save({ analytics: true, marketing: true })}
                  className="rounded-xl bg-ff-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ff-glow"
                >
                  {t.acceptAll}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
