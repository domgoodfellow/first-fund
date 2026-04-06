/**
 * File scanning via VirusTotal v3.
 *
 * Requires VIRUSTOTAL_API_KEY environment variable. When not set every file is
 * immediately marked 'clean' (preserving current behaviour).
 *
 * Flow:
 * 1. Download the file bytes from Supabase Storage (using the service-role key
 *    so the server can always read private buckets).
 * 2. Upload bytes to VT /files.
 * 3. Poll /analyses/{id} up to POLL_ATTEMPTS times.
 * 4. If any engine flags the file → return 'quarantined'.
 *    If scan finishes clean → return 'clean'.
 *    If still in progress after polling → return 'pending' (caller should
 *    schedule a webhook or background re-check).
 */

import { createClient } from '@supabase/supabase-js'
import { APPLICATION_DOCUMENT_BUCKET } from '@/lib/auth/config'

const VT_BASE = 'https://www.virustotal.com/api/v3'
const POLL_ATTEMPTS = 5
const POLL_INTERVAL_MS = 3_000

type ScanResult = 'clean' | 'quarantined' | 'pending'

export async function scanDocument(storagePath: string): Promise<ScanResult> {
  const apiKey = process.env.VIRUSTOTAL_API_KEY
  if (!apiKey) return 'clean'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return 'pending'

  // Download file bytes via service-role client (bypasses RLS).
  const admin = createClient(supabaseUrl, serviceKey)
  const { data: blob, error } = await admin.storage
    .from(APPLICATION_DOCUMENT_BUCKET)
    .download(storagePath)

  if (error || !blob) {
    console.error('[scanner] download failed', error)
    return 'pending'
  }

  const arrayBuffer = await blob.arrayBuffer()
  const bytes = new Uint8Array(arrayBuffer)

  // Submit to VirusTotal.
  const form = new FormData()
  form.append('file', new Blob([bytes]), storagePath.split('/').pop() ?? 'file')

  const uploadRes = await fetch(`${VT_BASE}/files`, {
    method: 'POST',
    headers: { 'x-apikey': apiKey },
    body: form,
  })

  if (!uploadRes.ok) {
    console.error('[scanner] VT upload failed', uploadRes.status)
    return 'pending'
  }

  const { data: { id: analysisId } } = await uploadRes.json() as { data: { id: string } }

  // Poll for result.
  for (let attempt = 0; attempt < POLL_ATTEMPTS; attempt++) {
    await sleep(POLL_INTERVAL_MS)

    const pollRes = await fetch(`${VT_BASE}/analyses/${analysisId}`, {
      headers: { 'x-apikey': apiKey },
    })

    if (!pollRes.ok) continue

    const { data: { attributes } } = await pollRes.json() as {
      data: { attributes: { status: string; stats: { malicious: number } } }
    }

    if (attributes.status !== 'completed') continue

    return attributes.stats.malicious > 0 ? 'quarantined' : 'clean'
  }

  return 'pending'
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
