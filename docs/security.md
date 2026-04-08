I reviewed the current implementation. The good news is the fundamentals are in place: protected routes, Supabase SSR auth, RLS on the main tables, a private storage bucket, and server-side Turnstile verification. The missing hardening is mostly in the “abuse resistance and integrity” layer.

Findings

Clients can currently write their own status_history rows. The policy named status_history_admin_insert is not actually admin-only; it also allows a client to insert rows for their own application. That means a client can forge timeline entries like approved or declined even if the applications.status row stays correct. See 202604050001_portal_admin_foundation.sql.

Document metadata is not tightly bound to application ownership. The documents_insert policy checks owner_profile_id = auth.uid(), but it does not verify that the referenced application_id belongs to that same user. Combined with the upload completion route trusting client-supplied applicationId and storagePath, a client could attach document records to an unrelated application ID. See 202604050001_portal_admin_foundation.sql, route.ts, and mutations.ts.

Activity logs can be forged for unrelated applications. The activity_logs_insert policy only checks actor_profile_id = auth.uid() for non-admins, not that the application_id belongs to the same user. That weakens your audit trail. See 202604050001_portal_admin_foundation.sql.

Authenticated POST routes have no explicit CSRF or origin checks. Because you are using cookie-based auth, endpoints like application submit, upload sign/complete, status change, and note creation should reject cross-site POSTs unless Origin or Referer matches your app. Right now the handlers rely on auth only. See route.ts, route.ts, route.ts, and route.ts.

There is no rate limiting yet. Public intake endpoints and authenticated mutation endpoints can currently be spammed. Turnstile helps on public forms, but it does not replace rate limiting, and it does nothing for authenticated abuse. See route.ts and route.ts.

Turnstile validation is minimal. You currently only check success. Cloudflare’s current docs recommend validating server-side and optionally checking hostname, action, and remoteip for tighter verification. See turnstile.ts.

Response hardening headers are missing. next.config.ts is empty, and proxy.ts currently handles auth redirects only. There is no CSP, frame-ancestors, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy yet. See next.config.ts and proxy.ts.

Upload validation is still first-pass only. You validate MIME type and size, which is good, but there is no file signature sniffing, malware scanning, quarantine flow, or cleanup for abandoned signed uploads. See upload.ts.

Concrete Checklist

Make status_history writes server-controlled only.
Change the status_history insert policy to admin-only, or move history creation behind a security-definer function or trigger that clients cannot call directly.
Tighten documents insert/update policies so application_id must belong to owner_profile_id, unless the actor is an admin.
In upload sign and upload complete handlers, verify that the application belongs to the current user before issuing a signed upload URL or writing metadata.
In the document download route, look up the document row first and authorize against the row, not only a raw storagePath.
Tighten activity_logs_insert so clients can only write logs for their own application IDs, or make logging server-only.
Add same-origin protection on authenticated POST endpoints by validating Origin and rejecting mismatches.
Add rate limiting:
Per-IP on /api/contact and /api/book-a-call.
Per-user and per-IP on upload, submit, admin note, and status endpoints.
Expand Turnstile verification to inspect hostname and, if you set it client-side, action.
Pass remoteip to Cloudflare Siteverify when available.
Add security headers. Minimum set:
Content-Security-Policy
X-Content-Type-Options: nosniff
Referrer-Policy
Permissions-Policy
frame-ancestors 'none' via CSP
Add upload hardening:
Validate file extension against MIME type.
Consider server-side file signature checks for PDFs/images.
Add a malware scan or quarantine flow before documents become staff-visible.
Add cleanup for orphaned uploads with no matching documents row.
Make audit logging consistent for note creation, status changes, document uploads, and submissions.
Keep secrets only in web/.env.local and Vercel env vars; never introduce service-role keys into browser code.
Test the RLS rules explicitly with two client accounts and one admin account before launch.
Priority Order

Fix the three policy gaps: status_history, documents, activity_logs.
Add ownership checks in upload/sign, upload/complete, and document signed-url routes.
Add CSRF/origin checks and rate limiting.
Add security headers and stronger Turnstile verification.
Add file scanning/quarantine and audit improvements.