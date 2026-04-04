'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface SlideNavRowProps {
  current: number
  total: number
  canAdvance: boolean
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
}

export default function SlideNavRow({
  current,
  total,
  canAdvance,
  onBack,
  onNext,
  onSubmit,
}: SlideNavRowProps) {
  const { t } = useLanguage()
  const isLast = current === total - 1

  return (
    <>
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-ff-border">
        <button
          type="button"
          onClick={onBack}
          disabled={current === 0}
          className="flex items-center gap-1.5 text-ff-muted hover:text-ff-text transition-colors text-sm font-medium disabled:opacity-0 disabled:pointer-events-none"
        >
          {t.apply.nav.back}
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canAdvance}
            className="bg-ff-accent text-white font-bold text-sm px-7 py-3 rounded-xl hover:bg-ff-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_1px_3px_rgba(30,64,175,0.3)]"
          >
            {t.apply.nav.submit}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!canAdvance}
            className="bg-ff-accent text-white font-bold text-sm px-7 py-3 rounded-xl hover:bg-ff-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_1px_3px_rgba(30,64,175,0.3)]"
          >
            {t.apply.nav.continue}
          </button>
        )}
      </div>

      {isLast && (
        <p className="text-ff-muted text-xs text-center mt-4">
          {t.apply.agreement}{' '}
          <a href="/terms" className="text-ff-accent underline underline-offset-2">{t.apply.termsLabel}</a>
          {' '}{t.apply.andWord}{' '}
          <a href="/privacy" className="text-ff-accent underline underline-offset-2">{t.apply.privacyLabel}</a>.
        </p>
      )}
    </>
  )
}
