export default function PortalMessagesPage() {
  return (
    <div className="rounded-2xl border border-ff-border bg-white p-8 shadow-[0_6px_30px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ff-accent">
        Messages
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold text-ff-text">
        Staff communication will live here
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ff-muted">
        This first rollout reserves a dedicated messages area so document requests, underwriting questions, and status updates have a clear home.
      </p>
    </div>
  )
}
