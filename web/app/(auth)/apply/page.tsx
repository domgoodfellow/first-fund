'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ApplyLandingPage() {
  const { t } = useLanguage()

  return (
    <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr,0.9fr]">
      <section className="rounded-[2rem] border border-ff-border bg-white p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
          {t.auth.apply.eyebrow}
        </p>
        <h1 className="mt-4 font-heading text-5xl font-bold leading-tight text-ff-text">
          {t.auth.apply.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ff-muted">
          {t.auth.apply.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/sign-up" className="rounded-full bg-ff-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ff-glow">
            {t.auth.apply.primaryCta}
          </Link>
          <Link href="/sign-in" className="rounded-full border border-ff-border px-6 py-3 text-sm font-semibold text-ff-text transition-colors hover:border-ff-accent hover:text-ff-accent">
            {t.auth.apply.secondaryCta}
          </Link>
        </div>
      </section>

      <section className="rounded-[2rem] border border-ff-border bg-slate-950 p-10 text-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
          {t.auth.apply.panelEyebrow}
        </p>
        <h2 className="mt-4 font-heading text-3xl font-bold">{t.auth.apply.panelTitle}</h2>
        <div className="mt-8 space-y-4">
          {t.auth.apply.benefits.map((benefit) => (
            <div key={benefit} className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-sm text-slate-200">
              {benefit}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
