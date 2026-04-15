-- =============================================================================
-- Chat persistence hardening + shared rate limiting
-- =============================================================================

create table if not exists public.security_rate_limits (
  key text primary key,
  count integer not null,
  window_started_at timestamptz not null,
  expires_at timestamptz not null
);

create index if not exists security_rate_limits_expires_idx
  on public.security_rate_limits (expires_at);

create or replace function public.consume_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
)
returns table (allowed boolean, retry_after integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_row public.security_rate_limits%rowtype;
  now_utc timestamptz := timezone('utc', now());
  retry_seconds integer;
begin
  if p_key is null or length(trim(p_key)) = 0 then
    raise exception 'p_key is required';
  end if;

  if p_limit <= 0 or p_window_seconds <= 0 then
    raise exception 'invalid rate limit parameters';
  end if;

  delete from public.security_rate_limits
  where expires_at <= now_utc;

  select *
  into current_row
  from public.security_rate_limits
  where key = p_key
  for update;

  if not found or current_row.window_started_at <= now_utc - make_interval(secs => p_window_seconds) then
    insert into public.security_rate_limits (key, count, window_started_at, expires_at)
    values (
      p_key,
      1,
      now_utc,
      now_utc + make_interval(secs => p_window_seconds)
    )
    on conflict (key) do update set
      count = 1,
      window_started_at = excluded.window_started_at,
      expires_at = excluded.expires_at;

    return query select true, null::integer;
    return;
  end if;

  if current_row.count >= p_limit then
    retry_seconds := greatest(
      1,
      ceil(extract(epoch from (current_row.window_started_at + make_interval(secs => p_window_seconds) - now_utc)))::integer
    );
    return query select false, retry_seconds;
    return;
  end if;

  update public.security_rate_limits
  set count = current_row.count + 1
  where key = p_key;

  return query select true, null::integer;
end;
$$;

grant execute on function public.consume_rate_limit(text, integer, integer) to anon, authenticated;

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  mode text not null default 'public' check (mode in ('public', 'authenticated', 'admin')),
  metadata jsonb not null default '{}'::jsonb,
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.chat_escalations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  status text not null default 'open' check (status in ('open', 'claimed', 'resolved')),
  reason text,
  claimed_by text,
  claimed_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists chat_messages_session_created_idx
  on public.chat_messages (session_id, created_at);

create index if not exists chat_sessions_user_created_idx
  on public.chat_sessions (user_id, created_at desc);

create index if not exists chat_sessions_expires_idx
  on public.chat_sessions (expires_at);

create index if not exists chat_escalations_status_created_idx
  on public.chat_escalations (status, created_at);

create or replace function public.set_chat_session_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_chat_session_updated_at on public.chat_sessions;

create trigger set_chat_session_updated_at
before update on public.chat_sessions
for each row execute function public.set_chat_session_updated_at();

alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.chat_escalations enable row level security;

drop policy if exists "chat_sessions_select_owner_or_admin" on public.chat_sessions;
create policy "chat_sessions_select_owner_or_admin"
  on public.chat_sessions for select
  to authenticated
  using (user_id = auth.uid() or public.current_user_is_admin());

drop policy if exists "chat_messages_select_owner_or_admin" on public.chat_messages;
create policy "chat_messages_select_owner_or_admin"
  on public.chat_messages for select
  to authenticated
  using (
    exists (
      select 1
      from public.chat_sessions
      where chat_sessions.id = chat_messages.session_id
        and (chat_sessions.user_id = auth.uid() or public.current_user_is_admin())
    )
  );

drop policy if exists "chat_escalations_admin_only" on public.chat_escalations;
create policy "chat_escalations_admin_only"
  on public.chat_escalations for select
  to authenticated
  using (public.current_user_is_admin());
