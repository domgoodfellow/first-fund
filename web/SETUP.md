# Setup Guide

Step-by-step instructions for getting the web app running locally and preparing it for production.

---

## Prerequisites

| Tool | Minimum version | Check |
|------|----------------|-------|
| Node.js | 18.17+ | `node -v` |
| npm | 9+ | `npm -v` |
| Git | any | `git --version` |

> **Tip:** Use [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage Node versions.

---

## Local development

### 1. Install dependencies

```bash
cd web
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads on every save.

### 3. Useful scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build (outputs to `.next/`) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Environment variables

Create a `.env.local` file in the `web/` directory (never commit this file):

```env
# Google Places API — used by ReviewsTicker for live reviews
# Leave blank to fall back to placeholder data
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=
NEXT_PUBLIC_GOOGLE_PLACE_ID=

# (Optional) CRM / backend endpoint for the apply form
NEXT_PUBLIC_APPLY_ENDPOINT=
```

> `.env.local` is git-ignored by default in Next.js projects. Double-check with `git status` before committing.

---

## Connecting the Google Reviews ticker

The ticker in `components/ReviewsTicker.tsx` ships with placeholder reviews. To show live Google data:

1. Go to [Google Cloud Console](https://console.cloud.google.com) → **APIs & Services** → enable **Places API**.
2. Create an API key and add it to `.env.local` as `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`.
3. Find your Google Place ID at [https://developers.google.com/maps/documentation/places/web-service/place-id](https://developers.google.com/maps/documentation/places/web-service/place-id) and add it as `NEXT_PUBLIC_GOOGLE_PLACE_ID`.
4. Create a Route Handler to fetch reviews server-side (keeps the API key off the client):

   ```
   web/app/api/reviews/route.ts
   ```

   ```ts
   import { NextResponse } from 'next/server'

   export async function GET() {
     const res = await fetch(
       `https://maps.googleapis.com/maps/api/place/details/json` +
       `?place_id=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID}` +
       `&fields=reviews` +
       `&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`,
       { next: { revalidate: 3600 } } // cache for 1 hour
     )
     const data = await res.json()
     return NextResponse.json(data.result?.reviews ?? [])
   }
   ```

5. Fetch from this route in `ReviewsTicker.tsx` using `useEffect` and replace the `GOOGLE_REVIEWS` constant.

---

## Connecting the apply form

`components/ApplyForm.tsx` has a `handleSubmit` stub marked with `// TODO`. Wire it to your CRM or backend:

```ts
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!requiredFields(form)) return

  await fetch(process.env.NEXT_PUBLIC_APPLY_ENDPOINT!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })

  setSubmitted(true)
}
```

---

## Production build

### Build and preview locally

```bash
npm run build
npm run start
```

### Deploy to Vercel (recommended)

1. Push the repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Set the **Root Directory** to `web`.
4. Add your environment variables in the Vercel project settings.
5. Deploy. Vercel auto-detects Next.js and configures the build.

### Deploy to any Node host

```bash
npm run build
# Upload the entire web/ directory (including .next/) to your server
npm run start  # runs on port 3000 by default
```

Set `PORT` to override: `PORT=8080 npm run start`.

---

## Adding a custom domain

### firsfund.com (US)
Point your DNS `A` / `CNAME` records to your host. On Vercel: **Project Settings → Domains → Add**.

### nextfund.ca (Canada)
Same process. Use Vercel's multi-domain support or deploy a second project pointed at the same repo with a `CA` country default.

---

## Fonts

Poppins and Inter are loaded via `next/font/google` in `app/layout.tsx` — no CDN link needed. They are self-hosted automatically by Next.js on build, so the site works fully offline after the first build.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Module not found: @/...` | Make sure you ran `npm install` inside the `web/` directory, not the repo root. |
| Styles not applying | Confirm `tailwind.config.ts` content paths include `./app/**` and `./components/**`. |
| Fonts not loading | `next/font` requires an internet connection on the first `npm run build` to download font files. Subsequent builds use the local cache. |
| Framer Motion hydration warning | Ensure any component using `motion.*` or `useInView` has `'use client'` at the top. |
| Reviews ticker not scrolling | Check browser reduced-motion settings; Framer Motion respects `prefers-reduced-motion`. |
