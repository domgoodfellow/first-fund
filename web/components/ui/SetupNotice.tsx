interface SetupNoticeProps {
  title: string
  description: string
}

export default function SetupNotice({ title, description }: SetupNoticeProps) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
        Configuration Required
      </p>
      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{description}</p>
    </div>
  )
}
