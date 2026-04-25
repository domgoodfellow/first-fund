'use client'

import { useRef, useState, type ReactNode } from 'react'

/* ─── Shared styling ──────────────────────────────────── */

export const inputClass =
  'w-full bg-ff-bg border border-ff-border rounded-xl px-4 py-3 text-ff-text placeholder:text-ff-muted text-sm focus:outline-none focus:border-ff-accent focus:ring-1 focus:ring-ff-border-blue transition-colors'

/** Used by BookingForm / ContactForm — small uppercase label */
export const labelClass = 'block text-ff-muted text-xs font-semibold mb-1.5 uppercase tracking-wide'

/* ─── Field ───────────────────────────────────────────── */

export function Field({
  label, value, onChange, type = 'text', placeholder, required, labelClassName,
}: {
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  type?: string
  placeholder?: string
  required?: boolean
  labelClassName?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={`${labelClass} ${labelClassName ?? ''}`.trim()}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClass}
        style={type === 'date' ? { colorScheme: 'light' } : undefined}
      />
    </div>
  )
}

/* ─── SelectField ─────────────────────────────────────── */

export function SelectField({
  label, value, onChange, options, placeholder, required, labelClassName,
}: {
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  options: readonly string[]
  placeholder?: string
  required?: boolean
  labelClassName?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={`${labelClass} ${labelClassName ?? ''}`.trim()}>{label}</label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`${inputClass} appearance-none cursor-pointer`}
        style={{ color: value ? 'var(--ff-text)' : 'var(--ff-muted)' }}
      >
        <option value="" disabled>{placeholder ?? 'Select an option'}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ff-surface">{o}</option>
        ))}
      </select>
    </div>
  )
}

/* ─── ConsentCheckbox ─────────────────────────────────── */

export function ConsentCheckbox({
  id, checked, onChange, label,
}: {
  id: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  label: ReactNode
}) {
  return (
    <label htmlFor={id} className="flex gap-3 cursor-pointer group">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 w-4 h-4 shrink-0 rounded border-ff-border bg-ff-bg accent-ff-accent cursor-pointer"
      />
      <span className="text-ff-muted text-xs leading-relaxed group-hover:text-ff-text transition-colors">
        {label}
      </span>
    </label>
  )
}

/* ─── FileDropZone ────────────────────────────────────── */

export function FileDropZone({
  label, hint, file, onChange, accept = '.pdf,.jpg,.jpeg,.png',
  dropHint, dropBrowse,
}: {
  label: string
  hint?: string
  file: File | null
  onChange: (f: File | null) => void
  accept?: string
  dropHint: string
  dropBrowse: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) onChange(f)
  }

  const fmtSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`

  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass}>{label}</label>
      {file ? (
        <div className="flex items-center gap-3 bg-ff-bg border border-ff-accent rounded-lg px-4 py-3">
          <svg className="w-5 h-5 text-ff-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-ff-text text-sm truncate">{file.name}</p>
            <p className="text-ff-muted text-xs">{fmtSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-ff-muted hover:text-white transition-colors ml-1 shrink-0 text-sm"
            aria-label="Remove file"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg px-4 py-6 flex flex-col items-center gap-2 cursor-pointer transition-colors ${
            dragging
              ? 'border-ff-accent bg-ff-surface'
              : 'border-ff-border hover:border-ff-accent hover:bg-ff-surface/40'
          }`}
        >
          <svg className="w-7 h-7 text-ff-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-ff-muted text-sm text-center">
            {dropHint} <span className="text-ff-accent">{dropBrowse}</span>
          </p>
          {hint && <p className="text-ff-muted text-xs text-center">{hint}</p>}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  )
}

/* ─── TextareaField ───────────────────────────────────── */

export function TextareaField({
  label, value, onChange, placeholder, required, rows = 4, labelClassName,
}: {
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  required?: boolean
  rows?: number
  labelClassName?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={`${labelClass} ${labelClassName ?? ''}`.trim()}>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`${inputClass} resize-none`}
      />
    </div>
  )
}

/* ─── SubmitButton ────────────────────────────────────── */

export function SubmitButton({
  label,
  disabled,
  fullWidth = true,
}: {
  label: string
  disabled?: boolean
  fullWidth?: boolean
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${fullWidth ? 'w-full' : ''} bg-ff-accent text-white font-bold text-sm py-3.5 rounded-xl hover:bg-ff-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_1px_3px_rgba(30,64,175,0.3)]`}
    >
      {label}
    </button>
  )
}
