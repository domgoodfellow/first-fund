import type {
  ApplicationRecord,
  ApplicationSectionRecord,
  Profile,
} from '@/lib/types'

interface ApplicationReviewPanelProps {
  application: ApplicationRecord
  clientProfile: Profile | null
  sections: ApplicationSectionRecord[]
}

export default function ApplicationReviewPanel({
  application,
  clientProfile,
  sections,
}: ApplicationReviewPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
            Application
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-slate-900">
            {application.legal_business_name ?? 'Untitled application'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {clientProfile?.email ?? application.contact_email ?? 'Client email unavailable'}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
          {application.status.replace(/_/g, ' ')}
        </span>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {sections.length ? (
          sections.map((section) => (
            <div
              key={section.section_key}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                {section.section_key.replace(/_/g, ' ')}
              </h3>
              <dl className="mt-4 space-y-3">
                {Object.entries(section.data).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {key}
                    </dt>
                    <dd className="mt-1 text-sm text-slate-800">{String(value ?? '')}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-600">No application sections have been saved yet.</p>
        )}
      </div>
    </div>
  )
}
