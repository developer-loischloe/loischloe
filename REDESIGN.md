# LOIS CHLOE — Redesign v2

Working branch for the customer-facing UI rewrite. Backend (Appwrite,
SSLCOMMERZ, Resend, APIs, dashboard, inventory) is **unchanged**.

## Scope

In scope (redesign):
- `src/app/(website)/**` — all customer-facing pages
- `src/components/Header/**`
- `src/components/Footer/**`
- `src/components/Home/**`
- `src/components/Products/**`
- `src/components/ProductDetails/**`
- `src/components/Cart/**`
- `src/components/Checkout/**` (UI only — payment logic preserved)
- `tailwind.config.ts`, `src/app/globals.css` (design tokens)

Out of scope (preserve as-is):
- `src/app/dashboard/**` — admin UI
- `src/app/api/**` — API routes
- `src/appwrite/**` — data access services
- `src/redux/**` — state management
- `src/lib/**` — tracking, pixel, utilities
- `src/app/agents/**`, `src/app/feed/**`

## Environment

Preview deploys run against the **production Appwrite project** (read-heavy).
Order creation on preview is gated by `NEXT_PUBLIC_ENV` — see `src/lib/env.ts`.

Required env vars are listed in `.env.example`. Values live in Vercel (never
committed).

## Branching

```
main              — production (untouched until merge)
redesign/v2       — this branch; preview deploys on every push
```

## Launch

When approved:
1. Squash-merge `redesign/v2` → `main`
2. Vercel auto-deploys to `loischloe.com.bd`
3. Rollback = revert merge or redeploy prior Vercel build

## Rollout safety

- `src/lib/feature-flags.ts` gates any write path (order, newsletter, review)
- Preview env forces `PREVIEW=true` → order submit shows a dialog instead of
  hitting SSLCOMMERZ
- Image assets reuse prod Appwrite buckets — read-only

## Conventions

- Components: PascalCase, colocated styles/logic
- Design tokens: single source in `tailwind.config.ts` + `globals.css`
- Motion: respect `prefers-reduced-motion` everywhere
- A11y: every interactive element has visible focus ring and aria-label
