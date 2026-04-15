# Security Checklist

## Implemented
- RLS hardening for `status_history`, `documents`, and `activity_logs` is applied in `supabase/migrations/202604060001_security_hardening.sql`.
- Upload sign/complete routes enforce application ownership checks before issuing URLs or writing metadata.
- Document downloads authorize against the document row instead of trusting a raw storage path.
- Mutating routes now enforce same-origin checks in production.
- Route-level rate limiting exists for public intake, application mutations, uploads, admin actions, and chat.
- Turnstile verification validates action, hostname, and `remoteip` when present.
- Security headers are configured in [`web/next.config.ts`](c:\Users\domin\Documents\First-Fund\first-fund\web\next.config.ts).
- Malware scanning and quarantine-aware document blocking exist in the upload flow.
- Audit logging is consistent for uploads, submissions, admin notes, status changes, and document access.

## Current Architecture Decisions
- Server-only writes that should not depend on end-user RLS now use the Supabase service-role key from server code only.
- Shared rate limiting is backed by Supabase through a security-definer RPC, with an in-memory fallback for local development when the service-role key is not configured.
- Chatbot persistence is server-managed only. There are no anonymous table read policies.
- Chat launch mode is controlled by `CHAT_MODE=public|authenticated|admin`.

## Remaining Hardening Before Production
- Replace the fallback in-memory limiter path by ensuring `SUPABASE_SERVICE_ROLE_KEY` is configured in every deployed environment.
- Add file-signature sniffing so MIME type checks are not extension-only.
- Add cleanup for orphaned uploads that never receive a matching `documents` row.
- Run explicit RLS verification with two client accounts and one admin account.
- Review CSP whenever new third-party scripts or browser-side integrations are added.

## Chatbot Rollout Rules
- Phase 1: public FAQ only. No account or application data in prompts.
- Phase 2: signed-in helper. Only `auth.uid()` scoped data, passed through fixed server-side tools.
- Phase 3: admin copilot. Admin-only access, explicit audit logs, and human confirmation before any state-changing action.

## Environment Requirements
- Keep `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, scanning keys, and any provider secrets server-only.
- Set `NEXT_PUBLIC_SITE_URL` so origin checks and Turnstile hostname validation are enforced correctly.
- Use `CHAT_RETENTION_DAYS` to control how long chatbot sessions remain queryable before expiry.
