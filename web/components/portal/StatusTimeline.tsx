'use client'

import type { ApplicationStatus, StatusHistoryRecord } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

const STATUS_ORDER: ApplicationStatus[] = [
  'draft',
  'submitted',
  'under_review',
  'needs_documents',
  'approved',
  'declined',
]

interface StatusTimelineProps {
  currentStatus: ApplicationStatus | null | undefined
  history: StatusHistoryRecord[]
}

export default function StatusTimeline({
  currentStatus,
  history,
}: StatusTimelineProps) {
  const { t } = useLanguage()

  const latestStatus = currentStatus ?? 'draft'
  const currentIndex = STATUS_ORDER.indexOf(latestStatus)

  return (
    <div className="rounded-2xl border border-ff-border bg-white p-6 shadow-[0_6px_30px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
        {t.portal.dashboard.timelineEyebrow}
      </p>
      <h2 className="mt-2 font-heading text-2xl font-bold text-ff-text">
        {t.portal.dashboard.timelineTitle}
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-6">
        {STATUS_ORDER.map((status, index) => {
          const active = index <= currentIndex
          return (
            <div key={status} className="flex items-start gap-3">
              <span
                className={`mt-1 inline-flex h-3 w-3 rounded-full ${
                  active ? 'bg-ff-accent' : 'bg-slate-200'
                }`}
              />
              <div>
                <p className="text-sm font-semibold capitalize text-ff-text">
                  {status.replace(/_/g, ' ')}
                </p>
                <p className="mt-1 text-xs text-ff-muted">
                  {history.find((item) => item.next_status === status)?.note ?? ' '}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
