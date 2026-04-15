# Homepage Funnel Wireframe

This document is the repo-side counterpart to the Figma wireframe. Treat it as the implementation contract for the homepage funnel.

## Frame Rules

- Desktop frame: `1440px` wide
- Content width: `1200px` max
- Desktop grid: `12 columns`
- Desktop gutter: `24px`
- Tablet frame: `1024px`
- Tablet grid: `8 columns`
- Tablet gutter: `20px`
- Mobile frame: `390px`
- Mobile grid: `4 columns`
- Mobile gutter: `16px`
- Spacing scale: `8 / 16 / 24 / 32 / 48 / 64 / 96`

## Section Order

1. Navbar
2. Hero
3. Pain Points
4. Main Products
5. How It Works
6. Why Not Banks
7. Proof Placeholder
8. FAQ
9. Final CTA
10. Footer
11. Mobile Sticky CTA

## Hero Matrix

The hero supports two independent switches:

- Message variants: `speed`, `access`, `growth`
- Visual variants: `video`, `clean`

Required review states:

1. `speed + video`
2. `speed + clean`
3. `access + video`
4. `access + clean`
5. `growth + video`
6. `growth + clean`

Preview via query params:

- `/?hero=speed&visual=video`
- `/?hero=speed&visual=clean`
- `/?hero=access&visual=video`
- `/?hero=access&visual=clean`
- `/?hero=growth&visual=video`
- `/?hero=growth&visual=clean`

## Main Product Model

The homepage presents three primary cards while preserving the six live service pages underneath.

### 1. Merchant Cash Advance

- Primary purpose: urgent working capital and flexible revenue-linked funding
- Secondary paths:
  - working capital
  - inventory funding
  - small equipment needs

### 2. Line of Credit

- Primary purpose: recurring access to capital
- Secondary paths:
  - cash flow support
  - growth capital
  - recurring operating needs

### 3. Expansion Funding

- Primary purpose: larger purchases and growth projects
- Secondary paths:
  - equipment financing
  - mortgage loans
  - business expansion funding

## Component Mapping

- Navbar: `web/components/layout/Navbar.tsx`
- Hero: `web/components/marketing/Hero.tsx`
- Pain Points: `web/components/marketing/PainPoints.tsx`
- Main Products: `web/components/marketing/HomepageProducts.tsx`
- How It Works: `web/components/marketing/HowItWorks.tsx`
- Why Not Banks: `web/components/marketing/BankComparison.tsx`
- Proof Placeholder: `web/components/marketing/ProofPlaceholder.tsx`
- FAQ: `web/components/marketing/HomepageFAQ.tsx`
- Final CTA: `web/components/marketing/CTASection.tsx`
- Mobile Sticky CTA: `web/components/marketing/MobileStickyCTA.tsx`
- Page assembly: `web/app/page.tsx`
- Funnel content and preview parsing: `web/lib/home-funnel.ts`

## Approved Public Claims

Only these claims are approved for homepage use unless compliance expands the list:

- Merchant cash advance
- Open terms
- Up to `150%` of monthly revenue
- Funding in `24–48 hours`
- Business line of credit up to `$3,000,000`
- Financing support for machine purchases
- Business mortgage loans
- Expansion funding

Do not publish:

- testimonial counts
- ratings
- funding volume totals
- approval-rate claims
- guarantees
- licensing claims
- unsupported speed or underwriting promises

## Responsive Notes

- Hero stacks to one column on mobile
- Both hero CTAs remain visible on mobile
- Buttons are full width on mobile
- Product cards stack to one column on mobile
- Comparison collapses from table to stacked rows on mobile
- Mobile sticky CTA remains visible above the safe area

## Acceptance Conditions

- Homepage section order matches this document
- Desktop implementation follows the desktop frame rules
- Mobile implementation follows the mobile frame rules
- All six hero preview states render without layout breakage
- Homepage narrows visitors into three main product cards
- The six service pages remain live but secondary
- Homepage proof is neutral until compliance signs off
