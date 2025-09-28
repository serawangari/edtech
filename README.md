# Leafscapes Starter (Next.js + Tailwind + next-intl + Supabase)

This repo gives you a production-friendly landing plus stubs for Schools/Corporates/NGOs, a lead form wired to Supabase + Resend, and SQL for your Supabase project.

## 1) Prereqs
- Node 18+
- VS Code
- A Supabase project (you already have one)
- A Resend API key (or comment out email in `app/actions/contact.ts`)

## 2) Setup
```bash
# In VS Code terminal
pnpm i    # or npm i / yarn
cp .env.example .env.local
# open .env.local and fill in:
# NEXT_PUBLIC_SUPABASE_URL=
# SUPABASE_SERVICE_ROLE_KEY= (server-only; never expose client side)
# RESEND_API_KEY=
# CONTACT_INBOX=hello@leafscapes.africa
```

## 3) Supabase – SQL
Open Supabase SQL editor and run the files in `/supabase` in this order:
1. `init.sql`  – types, tables, RLS policies, functions
2. `storage-policies.sql` – optional storage rules for evidence (future use)
3. `seed.sql`  – optional demo data

> If you want public (anon) leads without service role, use the RPC in `init.sql` and call it from the server action instead of direct insert.

## 4) Dev
```bash
pnpm dev
# visit http://localhost:3000/en
```

## 5) Deploy on Vercel
- Import the repo
- Add env vars in Vercel Project Settings → Environment Variables:
  - NEXT_PUBLIC_SUPABASE_URL
  - SUPABASE_SERVICE_ROLE_KEY  (marked as **Encrypted**)
  - RESEND_API_KEY
  - CONTACT_INBOX
- Build command: `next build` (default)
- Output: `.next` (default)

## 6) Customize
- Replace `public/logo.svg`, adjust colors in `tailwind.config.ts`.
- Edit copy in `messages/en.json` (and `fr.json`, `sw.json`).
- Swap placeholders with AGOL/Mapbox embeds in `ImpactSection`.

## 7) Next steps (recommended)
- Add Auth (Clerk or Auth.js) and attach profiles to organizations.
- Implement org onboarding and role redirects.
- Create AGOL/Mapbox visualizations and embed.
- Add NGO cohorts; add tree-specific tables if you track real counts.
- Write RLS policies to limit inserts to teacher/admin roles for activities.
