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

Place the file here:

[`web/.env.local`](c:\Users\domin\Documents\First-Fund\first-fund\web\.env.local)

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

Where each value comes from:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase Dashboard -> Project Settings -> API -> Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Dashboard -> Project Settings -> API -> Project API keys -> `anon` `public`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Dashboard -> Turnstile -> Add widget or open an existing widget -> Site Key
- `TURNSTILE_SECRET_KEY`: Cloudflare Dashboard -> Turnstile -> Add widget or open an existing widget -> Secret Key
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`: Google Cloud Console -> APIs & Services -> Credentials -> API keys
- `NEXT_PUBLIC_GOOGLE_PLACE_ID`: your Google Business/Profile place ID from the Google Place ID tools or Places API

Turnstile note:

- Cloudflare's current product name is `Turnstile`
- In the current dashboard flow you create a `widget`, then copy its site key and secret key
- If you do not immediately see `Turnstile` in the sidebar, use the Cloudflare dashboard search and search for `Turnstile`
- Cloudflare's official widget management doc is:
  - https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/

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

Supabase dashboard path:

- Authentication -> URL Configuration
- Set `Site URL` to your local or production app origin
- Add `Redirect URLs` for:
  - `http://localhost:3000/auth/callback`
  - your production `https://your-domain.com/auth/callback`

For Google OAuth later, you will also enable:

- Authentication -> Providers -> Google
- Paste the Google OAuth client ID and client secret there

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
- The auth pages, including `/apply`, now render the shared navbar so users can navigate back to marketing pages.
- `/book-a-call` and `/contact` submit through route handlers and require valid Turnstile tokens.
- The old public multi-step application form is no longer the main application flow.

## Google OAuth next steps

1. In Google Cloud Console, create an OAuth 2.0 Client ID for a web application.
2. Add authorized JavaScript origins:
   - `http://localhost:3000`
   - your production site origin
3. Add authorized redirect URIs:
   - your Supabase callback URL from Authentication -> Providers -> Google
   - for local testing this usually maps to your Supabase project auth callback plus `http://localhost:3000/auth/callback` on the app side
4. In Supabase, enable the Google provider and paste the Google client ID and secret.
5. Add Google sign-in buttons to [`web/components/auth/SignInForm.tsx`](c:\Users\domin\Documents\First-Fund\first-fund\web\components\auth\SignInForm.tsx) and [`web/components/auth/SignUpForm.tsx`](c:\Users\domin\Documents\First-Fund\first-fund\web\components\auth\SignUpForm.tsx) using `supabase.auth.signInWithOAuth({ provider: 'google' })`.
6. Use `options.redirectTo` with:

```text
http://localhost:3000/auth/callback
```

7. Test both sign-in and first-time sign-up flows, then verify the new user gets a `profiles` row with the default `client` role.
