'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getHomeFunnelContent } from '@/lib/home-funnel'

export default function MobileStickyCTA() {
  const { language } = useLanguage()
  const content = getHomeFunnelContent(language).stickyCta

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ff-border bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] pt-3 shadow-[0_-12px_32px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      <div className="flex gap-3">
        <Link
          href="/apply"
          className="flex-1 rounded-full bg-ff-accent px-5 py-3 text-center text-sm font-bold text-white"
        >
          {content.label}
        </Link>
        <Link
          href="/book-a-call"
          className="flex-1 rounded-full border border-ff-border-strong px-5 py-3 text-center text-sm font-semibold text-ff-text"
        >
          {content.secondary}
        </Link>
      </div>
    </div>
  )
}
