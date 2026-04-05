# FirstFund Web

Next.js App Router frontend for:
- the public marketing site
- authenticated client portal
- authenticated admin portal

The app now stays in one deployment unit under `web/`, with protected product surfaces layered on top of the original marketing site.

## Current surfaces

| Route area | Purpose |
|---|---|
| `/`, `/about`, `/services/*`, `/contact`, `/faq`, `/privacy`, `/terms`, `/book-a-call` | Marketing site |
| `/apply`, `/sign-in`, `/sign-up`, `/forgot-password` | Auth and application entry |
| `/portal/*` | Client portal |
| `/admin/*` | Admin portal |
| `/api/*` | Route handlers for intake, auth, application saves, uploads, and admin actions |

## Stack

- Next.js 16 App Router
- React 18
- Tailwind CSS
- Framer Motion
- Supabase Auth, Postgres, and Storage
- Cloudflare Turnstile for public-form bot checks
- Zod for request validation

## Project structure

```text
web/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    contact/page.tsx
    services/...
    (auth)/
      apply/page.tsx
      sign-in/page.tsx
      sign-up/page.tsx
      forgot-password/page.tsx
      auth/callback/route.ts
    (client-portal)/
      portal/
        layout.tsx
        dashboard/page.tsx
        application/page.tsx
        documents/page.tsx
        messages/page.tsx
        settings/page.tsx
    (admin)/
      admin/
        layout.tsx
        applications/page.tsx
        applications/[id]/page.tsx
        clients/page.tsx
        documents/page.tsx
        notes/page.tsx
    api/
      contact/route.ts
      book-a-call/route.ts
      applications/...
      uploads/...
      documents/...
      admin/...
      profile/settings/route.ts
  components/
    admin/
    auth/
    forms/
    layout/
    marketing/
    portal/
  lib/
    auth/
    db/
    permissions/
    storage/
    validations/
  proxy.ts
```

## Security model

- Route protection is enforced in [`proxy.ts`](c:\Users\domin\Documents\First-Fund\first-fund\web\proxy.ts) and server guards.
- Data protection is enforced with Supabase RLS in [`supabase/migrations/202604050001_portal_admin_foundation.sql`](c:\Users\domin\Documents\First-Fund\first-fund\supabase\migrations\202604050001_portal_admin_foundation.sql).
- File uploads use a private Supabase bucket with signed upload/download URLs.
- Public forms (`/contact` and `/book-a-call`) require server-side Turnstile verification.

## Key behavior changes

- `/apply` is no longer the public multi-step application form.
- `/apply` is now the auth-first application entry page.
- `/book-a-call` is the public lead-capture flow.
- The client portal owns the secure application draft, document uploads, and status timeline.
- The admin portal owns review, notes, and status changes.

## Required setup

Create `web/.env.local` from [`web/.env.example`](c:\Users\domin\Documents\First-Fund\first-fund\web\.env.example) and set:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=
NEXT_PUBLIC_GOOGLE_PLACE_ID=
```

You also need to:
- apply the Supabase migration under `supabase/migrations/`
- create the Supabase project and auth settings
- manually assign `admin` roles in the `profiles` table for staff accounts

Environment value sources:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Dashboard -> Project Settings -> API
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile widget settings after creating or opening a widget
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`: Google Cloud Console -> APIs & Services -> Credentials
- `NEXT_PUBLIC_GOOGLE_PLACE_ID`: your Google business place ID

Google OAuth is not wired yet. The next implementation step is to:
- create a Google OAuth web client in Google Cloud Console
- enable Google in Supabase Authentication -> Providers
- add the Supabase-provided redirect URI in Google
- add `signInWithOAuth({ provider: 'google' })` buttons to the auth forms
- keep the app callback at `/auth/callback`

## Validation

Production build currently passes with:

```bash
npm run build
```
