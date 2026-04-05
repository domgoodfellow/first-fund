import Link from 'next/link'
import type { ApplicationRecord } from '@/lib/types'

interface ApplicationsTableProps {
  applications: ApplicationRecord[]
}

export default function ApplicationsTable({
  applications,
}: ApplicationsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <th className="px-5 py-4">Client</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Stage</th>
            <th className="px-5 py-4">Requested</th>
            <th className="px-5 py-4">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {applications.map((application) => (
            <tr key={application.id} className="hover:bg-slate-50">
              <td className="px-5 py-4 text-sm text-slate-800">
                <Link href={`/admin/applications/${application.id}`} className="font-semibold text-slate-900 hover:text-blue-700">
                  {application.legal_business_name ?? application.contact_email ?? 'Untitled application'}
                </Link>
              </td>
              <td className="px-5 py-4 text-sm capitalize text-slate-700">
                {application.status.replace(/_/g, ' ')}
              </td>
              <td className="px-5 py-4 text-sm capitalize text-slate-700">
                {application.stage.replace(/_/g, ' ')}
              </td>
              <td className="px-5 py-4 text-sm text-slate-700">
                {application.requested_amount ? `$${application.requested_amount.toLocaleString()}` : 'N/A'}
              </td>
              <td className="px-5 py-4 text-sm text-slate-500">
                {application.updated_at ? new Date(application.updated_at).toLocaleDateString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
