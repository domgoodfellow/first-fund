'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const languageOptions = [
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
] as const

export default function AuthLanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ff-muted">
        {t.nav.language}
      </span>
      <div className="inline-flex rounded-full border border-ff-border bg-ff-surface p-1">
        {languageOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setLanguage(option.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              language === option.value
                ? 'bg-ff-accent text-white shadow-sm'
                : 'text-ff-muted hover:text-ff-text'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
