-- =============================================================================
-- Test account seed — run once in Supabase SQL editor (service role required)
-- =============================================================================
-- Accounts created:
--   admin@test.com   / TestAdmin123!   → role: admin
--   client@test.com  / TestClient123!  → role: client  (with a seeded application)
--
-- Safe to re-run: uses ON CONFLICT DO NOTHING throughout.
-- Delete with: SELECT delete_test_accounts();
-- =============================================================================

do $$
declare
  v_admin_id   uuid := '00000000-0000-0000-0000-000000000001';
  v_client_id  uuid := '00000000-0000-0000-0000-000000000002';
  v_app_id     uuid;
begin

  -- -------------------------------------------------------------------------
  -- 1. Auth users
  -- -------------------------------------------------------------------------
  insert into auth.users (
    id, instance_id, aud, role,
    email, encrypted_password,
    email_confirmed_at, confirmation_sent_at,
    raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at
  ) values
  (
    v_admin_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'admin@test.com',
    crypt('TestAdmin123!', gen_salt('bf')),
    now(), now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(), now()
  ),
  (
    v_client_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'client@test.com',
    crypt('TestClient123!', gen_salt('bf')),
    now(), now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(), now()
  )
  on conflict (id) do nothing;

  -- -------------------------------------------------------------------------
  -- 2. Profiles
  -- -------------------------------------------------------------------------
  insert into public.profiles (id, email, role, language, market)
  values
    (v_admin_id,  'admin@test.com',  'admin',  'en', 'us'),
    (v_client_id, 'client@test.com', 'client', 'en', 'us')
  on conflict (id) do nothing;

  -- -------------------------------------------------------------------------
  -- 3. Client application (submitted, under review)
  -- -------------------------------------------------------------------------
  insert into public.applications (
    id, client_profile_id,
    status, stage,
    legal_business_name, contact_name, contact_email,
    requested_amount, funding_purpose,
    submitted_at
  ) values (
    gen_random_uuid(), v_client_id,
    'under_review', 'review',
    'Acme Corp LLC', 'Jane Client', 'client@test.com',
    75000.00, 'Working Capital',
    now() - interval '2 days'
  )
  returning id into v_app_id;

  -- -------------------------------------------------------------------------
  -- 4. Application sections (so the form shows as filled in)
  -- -------------------------------------------------------------------------
  insert into public.application_sections (application_id, section_key, data, is_complete, completed_at)
  values
  (v_app_id, 'business_details', '{
    "companyName": "Acme Corp LLC",
    "businessType": "LLC",
    "industry": "Retail",
    "yearsInBusiness": "3",
    "fundingAmount": "75000",
    "fundingPurpose": "Working Capital"
  }'::jsonb, true, now() - interval '3 days'),
  (v_app_id, 'business_address', '{
    "street": "123 Main Street",
    "city": "New York",
    "provinceState": "New York",
    "postalZip": "10001",
    "country": "United States"
  }'::jsonb, true, now() - interval '3 days'),
  (v_app_id, 'contact_details', '{
    "fullName": "Jane Client",
    "email": "client@test.com",
    "phone": "555-000-1234"
  }'::jsonb, true, now() - interval '3 days'),
  (v_app_id, 'financial_profile', '{
    "monthlyRevenue": "25000",
    "creditScore": "680",
    "existingDebt": "5000"
  }'::jsonb, true, now() - interval '3 days')
  on conflict (application_id, section_key) do nothing;

  -- -------------------------------------------------------------------------
  -- 5. Status history
  -- -------------------------------------------------------------------------
  insert into public.status_history
    (application_id, previous_status, next_status, changed_by_profile_id, note)
  values
    (v_app_id, null,           'draft',        v_client_id, null),
    (v_app_id, 'draft',        'submitted',    v_client_id, 'Client submitted application.'),
    (v_app_id, 'submitted',    'under_review', v_admin_id,  'Application looks complete, moving to review.');

  -- -------------------------------------------------------------------------
  -- 6. Admin note
  -- -------------------------------------------------------------------------
  insert into public.application_notes (application_id, author_profile_id, body)
  values (v_app_id, v_admin_id, 'Revenue looks solid. Request bank statements for last 3 months before approving.');

  -- -------------------------------------------------------------------------
  -- 7. Activity log
  -- -------------------------------------------------------------------------
  insert into public.activity_logs (application_id, actor_profile_id, action, metadata)
  values
    (v_app_id, v_client_id, 'application_submitted', '{}'::jsonb),
    (v_app_id, v_admin_id,  'status_changed', '{"from":"submitted","to":"under_review"}'::jsonb);

end $$;


-- =============================================================================
-- Cleanup helper — call this to wipe the test accounts and all related data
-- =============================================================================
create or replace function delete_test_accounts()
returns void language plpgsql as $$
begin
  delete from auth.users
  where id in (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002'
  );
  -- Profiles + applications cascade automatically via FK ON DELETE CASCADE
end $$;
