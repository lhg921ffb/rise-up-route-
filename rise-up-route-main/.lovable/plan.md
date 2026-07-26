# Premium Bootcamp Funnel — Build Plan (v2)

A focused 4-step conversion funnel. No nav, no footer links, no distractions. **Dark theme with energetic red accents**, cinematic sunrise imagery, glassmorphism cards, Framer Motion transitions, mobile-first. **Fully bilingual: English + Dutch (NL default).**

## Routes (TanStack Start)

```
src/routes/
  index.tsx          -> / (Step 1: Landing)
  apply.tsx          -> /apply (Step 2: Qualification quiz)
  contact.tsx        -> /contact (Step 3: Contact form)
  confirmation.tsx   -> /confirmation (Step 4: Success)
```

Each route gets its own `head()` with unique title/description/og (localized based on active language). No shared nav header, no site footer with links — only a minimal brand mark, a compact **language toggle (NL / EN)** in the top corner, and a progress bar on funnel steps.

## Internationalization (EN + NL)

- Lightweight i18n via a typed `translations.ts` dictionary (no heavy library needed).
- `LanguageProvider` (React context) with keys like `hero.headline`, `quiz.q1.title`, etc.
- Default language: **Dutch (NL)**. Toggle persists in `localStorage`.
- Every user-facing string lives in the dictionary — no hardcoded copy in components.
- `head()` meta pulls from the dictionary so titles/descriptions localize too.
- Compact top-right toggle: `NL · EN`.

## Step 1 — Landing (`/`)

1. **Hero** — full-viewport cinematic sunrise bootcamp background. Bold result-focused headline, supporting subhead, single "Reserveer Mijn Plek" / "Reserve My Spot" CTA. Meta strip: spots left · start date · location · duration · ★ 4.9/5 · 250+ members.
2. **Trust badges** row.
3. **Benefits grid** — 6 glass cards with Lucide icons.
4. **Before / After** transformation cards.
5. **Coach intro** — portrait + bio.
6. **Testimonials** — realistic AI portraits.
7. **FAQ** accordion.
8. **Final CTA band** with urgency.

All CTAs → `/apply`.

## Step 2 — Qualification (`/apply`)

- Progress bar "Stap 2 van 4" / "Step 2 of 4".
- One question per screen, 5 total: goal, training frequency, age range, preferred times, biggest obstacle.
- Large selectable cards with animated selected state.
- Continue disabled until answered.
- Framer Motion slide/fade transitions between questions.
- State in Zustand, persisted to `sessionStorage`.
- Completion → `/contact`.

## Step 3 — Contact (`/contact`)

- Progress bar "Stap 3 van 4".
- Premium form: First Name, Last Name, Email, Phone (required); Emergency Contact, Medical Limitations (optional).
- Zod + react-hook-form validation, inline localized errors.
- Localized privacy notice.
- Continue → `/confirmation`.

## Step 4 — Confirmation (`/confirmation`)

- Progress bar "100% Compleet" / "100% Complete".
- Large success illustration.
- Localized copy: coach reviews within 24h, confirmation email, bring sportswear + water.
- Primary CTA: "Boek Je Intakegesprek" / "Book Your Intake Call".
- Secondary CTA: "Download Voorbereidingsgids" / "Download Preparation Guide".

## Design System

Add to `src/styles.css`:

- Dark base: near-black background (`oklch(~0.13 0.02 20)`), off-white foreground.
- **Energetic red accent** as `--primary` (e.g. `oklch(~0.60 0.22 25)`) plus a brighter glow variant.
- Glass surface tokens: translucent card bg + backdrop-blur utility.
- Display font (bold condensed like Anton/Bebas via `<link>` in `__root.tsx`) + body sans (Inter).
- Rounded card tokens (xl/2xl).
- Subtle scroll reveals, quiz transitions via Framer Motion.

## Data / State

- Frontend-only funnel state (Zustand) persisted to `sessionStorage`.
- No backend this pass — submission on Step 3 stores locally, routes to confirmation.

## Assets (generated + uploaded via lovable-assets)

- Hero: cinematic sunrise outdoor bootcamp, real people training.
- Before/After transformation portraits (2 pairs).
- Coach portrait.
- 3–4 testimonial portraits.
- Success illustration for Step 4.

## Technical Details

- Framer Motion for transitions/reveals.
- Zod + react-hook-form for Step 3.
- Zustand for funnel state.
- Localized `head()` metadata per route; hero image URL wired to og:image/twitter:image at leaf routes.
- No global nav — only `<Outlet />`, language toggle, and progress bar.

## Out of Scope (this pass)

- Real backend signup storage / email sending (can add later via Lovable Cloud + managed email).
- Payments, analytics.

## Design Direction Step

Before building, I'll generate 3 rendered design directions (all locked to: dark + red, bold display type, glass cards, cinematic hero, bilingual NL/EN) varying in composition/density/motion register so you can pick one, then implement end-to-end.
