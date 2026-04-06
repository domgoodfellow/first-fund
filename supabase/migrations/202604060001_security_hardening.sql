-- =============================================================================
-- Security hardening: fix three RLS policy gaps + add document scan_status
-- =============================================================================

-- Fix 1: status_history INSERT must be admin-only.
-- The previous policy allowed clients to write their own status history entries,
-- which could corrupt the immutable audit trail.
drop policy if exists "status_history_admin_insert" on public.status_history;

create policy "status_history_admin_insert" on public.status_history
for insert
to authenticated
with check (public.current_user_is_admin());

-- Fix 2: documents INSERT must verify that the application_id belongs to the
-- inserting user, not just that owner_profile_id = auth.uid(). Without this a
-- client could attach a document to another client's application.
drop policy if exists "documents_insert" on public.documents;

create policy "documents_insert" on public.documents
for insert
to authenticated
with check (
  owner_profile_id = auth.uid()
  and (
    public.current_user_is_admin()
    or exists (
      select 1
      from public.applications
      where applications.id = documents.application_id
        and applications.client_profile_id = auth.uid()
    )
  )
);

-- Fix 3: activity_logs INSERT must verify application ownership in addition to
-- actor identity. Without this a user could log activity against any application.
drop policy if exists "activity_logs_insert" on public.activity_logs;

create policy "activity_logs_insert" on public.activity_logs
for insert
to authenticated
with check (
  actor_profile_id = auth.uid()
  and (
    public.current_user_is_admin()
    or exists (
      select 1
      from public.applications
      where applications.id = activity_logs.application_id
        and applications.client_profile_id = auth.uid()
    )
  )
);

-- Add scan_status enum and column to support file quarantine.
-- Default is 'pending' so all existing documents get rescanned if a scanner
-- is later configured. Downloads of 'quarantined' documents are blocked in
-- the signed-url API route.
do $$ begin
  if not exists (select 1 from pg_type where typname = 'scan_status') then
    create type public.scan_status as enum ('pending', 'clean', 'quarantined');
  end if;
end $$;

alter table public.documents
  add column if not exists scan_status public.scan_status not null default 'pending';
