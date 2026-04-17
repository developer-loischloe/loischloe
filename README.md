This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Required environment variables

Missing values cause silent feature failures (CAPI, order emails, AI
assistant). Configure these in Vercel → Project Settings → Environment
Variables for every environment that needs them.

| Variable | Used by | Notes |
|---|---|---|
| `NEXT_PUBLIC_APP_BASE_URL` | Shared config | Public site URL |
| `NEXT_PUBLIC_APPWRITE_URL` | Appwrite client/server | Appwrite endpoint |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Appwrite client/server | |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | All collections | |
| `NEXT_APPWRITE_API_KEY` | Server SDK (coupons, server ops) | Server-only |
| `NEXT_PUBLIC_APPWRITE_COLLECTION_ID_*` | Product, order, category, blog, etc. | Many — see `src/config/index.ts` |
| `META_PIXEL_ID` | Meta Pixel + CAPI | Defaults to `1148015303657843` |
| `META_CAPI_ACCESS_TOKEN` | Server CAPI route | **Required** for server-side Meta events (Events Manager → Settings → Generate access token) |
| `RESEND_API_KEY` | Order notification email | Required |
| `RESEND_FROM` | Order notification email | e.g. `LOIS CHLOE Orders <orders@loischloe.com.bd>`. Domain must be verified in Resend or emails silently drop. |
| `ORDER_NOTIFICATION_TO` | Order notification email | Admin recipient; defaults to `developer.loischloe@gmail.com` |
| `GEMINI_API_KEY` | AI beauty assistant, ingredient checker | Optional; feature disabled when unset |
| `INSTAGRAM_ACCESS_TOKEN` | Instagram feed component | Optional; falls back to static content |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
