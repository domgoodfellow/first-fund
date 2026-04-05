# Setup Guide

This project now has three product surfaces inside one Next.js app:
- marketing
- client portal
- admin portal

## 1. Install dependencies

```bash
cd web
npm install
```

## 2. Configure environment variables

Copy the example file:

```bash
copy .env.example .env.local
```

Required values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Optional values:

```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=
NEXT_PUBLIC_GOOGLE_PLACE_ID=
```

## 3. Apply the Supabase migration

Run the SQL in:

[`supabase/migrations/202604050001_portal_admin_foundation.sql`](c:\Users\domin\Documents\First-Fund\first-fund\supabase\migrations\202604050001_portal_admin_foundation.sql)

This migration creates:
- `profiles`
- `applications`
- `application_sections`
- `documents`
- `application_notes`
- `status_history`
- `activity_logs`
- `lead_requests`
- `contact_inquiries`
- RLS policies
- private `application-documents` bucket access rules

## 4. Configure Supabase auth

Set your site URL and redirect URLs so email auth can return to:

```text
http://localhost:3000/auth/callback
```

For production, add your live domain callback as well.

## 5. Create admin users

Staff accounts are manual for v1.

After a staff user exists in `auth.users`, update their profile row:

```sql
update public.profiles
set role = 'admin'
where email = 'staff@example.com';
```

## 6. Start the app

```bash
npm run dev
```

Primary routes:
- `http://localhost:3000/`
- `http://localhost:3000/apply`
- `http://localhost:3000/portal/dashboard`
- `http://localhost:3000/admin/applications`

## 7. Verify production build

```bash
npm run build
```

## Notes

- `/apply` is now the auth-first application entry page.
- `/book-a-call` and `/contact` submit through route handlers and require valid Turnstile tokens.
- The old public multi-step application form is no longer the main application flow.
