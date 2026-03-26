# FirsFund / NextFund — Web

The marketing and application frontend for the FirsFund (US) and NextFund (CA) business financing platform. Built with Next.js 14, Tailwind CSS, and Framer Motion.

---

## What this is

A dual-brand fintech site that serves two markets from a single codebase:

| Market | Brand | Domain | Currency |
|--------|-------|--------|----------|
| United States | FirsFund | firsfund.com | USD |
| Canada | NextFund | nextfund.ca | CAD |

Visitors toggle their market in the navbar. The brand name, currency labels, and all copy switch instantly — including full translations for **English**, **Spanish** (US), and **French** (CA).

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, stats, how it works, services, testimonials, CTA |
| `/apply` | One-page funding application form |
| `/terms` | Terms of Service |
| `/privacy` | Privacy Policy |

---

## Feature highlights

- **Country + language toggle** in the navbar. US offers EN/ES; CA offers EN/FR. All UI copy is translated via `lib/i18n.ts`.
- **Google Reviews ticker** — an infinite-scroll strip below the navbar displaying live social proof. Placeholder data is included; wire it to the Google Places API when ready (see `components/ReviewsTicker.tsx`).
- **Animated hero** — floating gradient orbs and a pulsing green CTA built with Framer Motion.
- **Scroll-triggered reveals** — every major section fades and slides in as the user scrolls.
- **Application form** — progress bar, all required fields (company, contact, revenue, industry, referral), dual SMS consent checkboxes, and a success state.
- **Dark design system** — custom Tailwind tokens (`ff-*`) matching the brand spec exactly.

---

## Project structure

```
web/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout — fonts, CountryProvider
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Tailwind base + custom utilities
│   ├── apply/page.tsx      # Application page
│   ├── terms/page.tsx      # Terms of Service
│   └── privacy/page.tsx    # Privacy Policy
│
├── components/
│   ├── Navbar.tsx          # Fixed nav with country/language toggle
│   ├── ReviewsTicker.tsx   # Infinite-scroll Google reviews strip
│   ├── Hero.tsx            # Full-screen animated hero
│   ├── Stats.tsx           # Key stats bar (decisions, funding, etc.)
│   ├── HowItWorks.tsx      # 4-step process timeline
│   ├── Services.tsx        # 4 product cards (MCA, LOC, MTG, FTL)
│   ├── Testimonials.tsx    # Customer quote cards
│   ├── CTABanner.tsx       # Mid-page call-to-action section
│   ├── Footer.tsx          # Site footer with links and disclaimer
│   └── ApplyForm.tsx       # Funding application form
│
├── contexts/
│   └── CountryContext.tsx  # Country + language state and derived values
│
├── lib/
│   └── i18n.ts             # All UI copy in EN, FR, and ES
│
├── next.config.ts
├── tailwind.config.ts      # Custom ff-* color tokens, fonts, animations
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Design tokens

Defined in `tailwind.config.ts` and used as Tailwind utility classes throughout:

| Token | Class | Hex |
|-------|-------|-----|
| Background | `bg-ff-bg` | `#0A0F1E` |
| Surface | `bg-ff-surface` | `#111827` |
| Accent (green) | `text-ff-accent` / `bg-ff-accent` | `#22C55E` |
| Accent glow | `text-ff-glow` | `#34D399` |
| Muted text | `text-ff-muted` | `#9CA3AF` |
| Border | `border-ff-border` | `#1F2937` |
| Trust bg | `bg-ff-trust` | `#1E2A44` |

Typography: **Poppins** (headings, `font-heading`) · **Inter** (body, `font-body`).

---

## Adding a new language

1. Add a new key to the `translations` object in `lib/i18n.ts` (copy the `en` block as a template).
2. Add the `Language` union type (`export type Language = 'en' | 'fr' | 'es' | 'xx'`).
3. Add the language to the relevant country in `countryLanguages` in `contexts/CountryContext.tsx`.
4. Add a display label in the `langLabels` map in `components/Navbar.tsx`.

---

## Wiring the Google Reviews ticker

`components/ReviewsTicker.tsx` currently uses hardcoded placeholder reviews. To connect live data:

1. Enable the **Places API** in your Google Cloud project.
2. Fetch reviews server-side (Next.js Route Handler or `generateStaticParams`) from:
   ```
   GET https://maps.googleapis.com/maps/api/place/details/json
     ?place_id=YOUR_PLACE_ID
     &fields=reviews
     &key=YOUR_API_KEY
   ```
3. Pass the result as a prop to `<ReviewsTicker reviews={reviews} />` and remove the hardcoded `GOOGLE_REVIEWS` array.

---

## Legal entity

**9508-8142 Québec Inc.** · [info@nextfund.ca](mailto:info@nextfund.ca) · +1 438 813 5149
