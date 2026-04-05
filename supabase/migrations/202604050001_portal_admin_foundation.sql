create extension if not exists pgcrypto;

create type public.app_role as enum ('client', 'admin');
create type public.application_status as enum (
  'draft',
  'submitted',
  'under_review',
  'needs_documents',
  'approved',
  'declined'
);
create type public.application_stage as enum (
  'business_details',
  'business_address',
  'contact_details',
  'financial_profile',
  'documents',
  'review'
);
create type public.document_category as enum (
  'bank_statements',
  'government_id',
  'void_cheque',
  'incorporation_docs',
  'tax_returns',
  'financial_statements',
  'other_supporting_docs'
);
create type public.document_status as enum ('uploaded', 'requested', 'approved', 'rejected');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role public.app_role not null default 'client',
  language text not null default 'en' check (language in ('en', 'es')),
  market text not null default 'us' check (market in ('us', 'ca')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  client_profile_id uuid not null references public.profiles(id) on delete cascade,
  status public.application_status not null default 'draft',
  stage public.application_stage not null default 'business_details',
  assigned_admin_profile_id uuid references public.profiles(id) on delete set null,
  legal_business_name text,
  contact_name text,
  contact_email text,
  requested_amount numeric(12, 2),
  funding_purpose text,
  submitted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.application_sections (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  section_key public.application_stage not null,
  data jsonb not null default '{}'::jsonb,
  is_complete boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (application_id, section_key)
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  owner_profile_id uuid not null references public.profiles(id) on delete cascade,
  category public.document_category not null,
  file_name text not null,
  storage_path text not null unique,
  mime_type text,
  size_bytes integer,
  status public.document_status not null default 'uploaded',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.application_notes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  author_profile_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  previous_status public.application_status,
  next_status public.application_status not null,
  changed_by_profile_id uuid references public.profiles(id) on delete set null,
  note text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete cascade,
  actor_profile_id uuid references public.profiles(id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lead_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  business_name text,
  email text not null,
  phone text not null,
  funding_goal text not null,
  call_time text not null,
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role, language, market)
  values (
    new.id,
    coalesce(new.email, ''),
    'client',
    coalesce(new.raw_user_meta_data ->> 'language', 'en'),
    coalesce(new.raw_user_meta_data ->> 'market', 'us')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at before update on public.applications
for each row execute procedure public.set_updated_at();

drop trigger if exists application_sections_set_updated_at on public.application_sections;
create trigger application_sections_set_updated_at before update on public.application_sections
for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.applications enable row level security;
alter table public.application_sections enable row level security;
alter table public.documents enable row level security;
alter table public.application_notes enable row level security;
alter table public.status_history enable row level security;
alter table public.activity_logs enable row level security;
alter table public.lead_requests enable row level security;
alter table public.contact_inquiries enable row level security;

create or replace function public.current_user_is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create policy "profiles_self_select" on public.profiles
for select
to authenticated
using (id = auth.uid() or public.current_user_is_admin());

create policy "profiles_self_update" on public.profiles
for update
to authenticated
using (id = auth.uid() or public.current_user_is_admin())
with check (id = auth.uid() or public.current_user_is_admin());

create policy "applications_client_select" on public.applications
for select
to authenticated
using (client_profile_id = auth.uid() or public.current_user_is_admin());

create policy "applications_client_insert" on public.applications
for insert
to authenticated
with check (client_profile_id = auth.uid() or public.current_user_is_admin());

create policy "applications_client_update" on public.applications
for update
to authenticated
using (client_profile_id = auth.uid() or public.current_user_is_admin())
with check (client_profile_id = auth.uid() or public.current_user_is_admin());

create policy "application_sections_select" on public.application_sections
for select
to authenticated
using (
  exists (
    select 1
    from public.applications
    where applications.id = application_sections.application_id
      and (applications.client_profile_id = auth.uid() or public.current_user_is_admin())
  )
);

create policy "application_sections_insert_update" on public.application_sections
for all
to authenticated
using (
  exists (
    select 1
    from public.applications
    where applications.id = application_sections.application_id
      and (applications.client_profile_id = auth.uid() or public.current_user_is_admin())
  )
)
with check (
  exists (
    select 1
    from public.applications
    where applications.id = application_sections.application_id
      and (applications.client_profile_id = auth.uid() or public.current_user_is_admin())
  )
);

create policy "documents_select" on public.documents
for select
to authenticated
using (owner_profile_id = auth.uid() or public.current_user_is_admin());

create policy "documents_insert" on public.documents
for insert
to authenticated
with check (owner_profile_id = auth.uid() or public.current_user_is_admin());

create policy "documents_update" on public.documents
for update
to authenticated
using (owner_profile_id = auth.uid() or public.current_user_is_admin())
with check (owner_profile_id = auth.uid() or public.current_user_is_admin());

create policy "application_notes_admin_only" on public.application_notes
for all
to authenticated
using (public.current_user_is_admin())
with check (public.current_user_is_admin());

create policy "status_history_select" on public.status_history
for select
to authenticated
using (
  public.current_user_is_admin()
  or exists (
    select 1
    from public.applications
    where applications.id = status_history.application_id
      and applications.client_profile_id = auth.uid()
  )
);

create policy "status_history_admin_insert" on public.status_history
for insert
to authenticated
with check (
  public.current_user_is_admin()
  or exists (
    select 1
    from public.applications
    where applications.id = status_history.application_id
      and applications.client_profile_id = auth.uid()
  )
);

create policy "activity_logs_select" on public.activity_logs
for select
to authenticated
using (
  public.current_user_is_admin()
  or exists (
    select 1
    from public.applications
    where applications.id = activity_logs.application_id
      and applications.client_profile_id = auth.uid()
  )
);

create policy "activity_logs_insert" on public.activity_logs
for insert
to authenticated
with check (
  public.current_user_is_admin()
  or actor_profile_id = auth.uid()
);

create policy "lead_requests_public_insert" on public.lead_requests
for insert
to anon, authenticated
with check (true);

create policy "contact_inquiries_public_insert" on public.contact_inquiries
for insert
to anon, authenticated
with check (true);

insert into storage.buckets (id, name, public)
values ('application-documents', 'application-documents', false)
on conflict (id) do nothing;

create policy "storage_select_own_or_admin" on storage.objects
for select
to authenticated
using (
  bucket_id = 'application-documents'
  and (
    public.current_user_is_admin()
    or (storage.foldername(name))[1] = auth.uid()::text
  )
);

create policy "storage_insert_own_or_admin" on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'application-documents'
  and (
    public.current_user_is_admin()
    or (storage.foldername(name))[1] = auth.uid()::text
  )
);
