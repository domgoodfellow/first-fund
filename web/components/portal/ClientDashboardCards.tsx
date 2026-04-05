'use client'

import type { ApplicationRecord, ApplicationSectionRecord, DocumentRecord } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface ClientDashboardCardsProps {
  application: ApplicationRecord | null
  documents: DocumentRecord[]
  sections: ApplicationSectionRecord[]
}

export default function ClientDashboardCards({
  application,
  documents,
  sections,
}: ClientDashboardCardsProps) {
  const { t } = useLanguage()

  const cards = [
    {
      label: t.portal.dashboard.currentStatus,
      value: application?.status?.replace(/_/g, ' ') ?? t.portal.dashboard.notStarted,
    },
    {
      label: t.portal.dashboard.completedSections,
      value: `${sections.filter((section) => section.is_complete).length}/4`,
    },
    {
      label: t.portal.dashboard.documentsUploaded,
      value: String(documents.length),
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-ff-border bg-white p-5 shadow-[0_6px_30px_rgba(15,23,42,0.05)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-muted">
            {card.label}
          </p>
          <p className="mt-3 font-heading text-3xl font-bold capitalize text-ff-text">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  )
}
