# D.A.R. Motors — Vehicle Inventory & Sales MVP

A validation-first vehicle inventory system with a public storefront and a staff-oriented admin workflow. The default build runs in **demo mode** with browser-local data so it can be shown to the customer before a backend account is configured.

## What is implemented
- Public home, inventory, vehicle detail and enquiry flow.
- Filters for manufacturer, fuel and status (schema supports expansion to price/year/transmission).
- Admin dashboard, vehicle list, create/edit/delete, Draft/Available/Reserved/Sold workflow.
- Multi-image browser upload preview/removal in demo mode (cover defaults to first image).
- Lead inbox with New/Contacted/Closed states.
- Five realistic Latvia-oriented demo vehicles.
- Centralized starter copy module for later LV/RU/EN i18n.
- Supabase PostgreSQL schema, RLS policies and Storage bucket migration.
- Zod validation primitives and Vitest validation tests.

## Important MVP boundary
The customer-validation build intentionally uses localStorage for write operations. This removes backend setup from the first 10-minute test and lets the employee add/edit cars immediately. **Do not use demo mode for real customer data.** The included Supabase migration is the production foundation; wiring the repository layer to Supabase Auth/DB/Storage is the first post-validation implementation step.

## Local run
```bash
cp .env.example .env.local
npm install
npm run dev
```
Open http://localhost:3000 and http://localhost:3000/admin. Demo login: `demo@darmotors.local` / `demo1234`.

## Quality checks
```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Supabase production setup
1. Create a Supabase project.
2. Run `supabase/migrations/001_initial.sql` in SQL Editor or through Supabase CLI migrations.
3. Create the first admin user in Auth.
4. Insert that user's UUID into `public.profiles` with role `admin`.
5. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` locally/Vercel. Never expose the service-role key.
6. Replace the demo repository in `src/lib/store.ts` with a Supabase repository. Public reads use anon + RLS; admin writes require authenticated session. Upload images to `vehicle-images` and store only storage paths in `vehicle_images`.
7. Add server-side validation/rate limiting for public leads before accepting production traffic.

## Deployment
### Vercel demo
Import the GitHub repository into Vercel, set `NEXT_PUBLIC_DEMO_MODE=true`, deploy. Browser-local changes are per-device and are not shared.

### Production
Set `NEXT_PUBLIC_DEMO_MODE=false`, configure Supabase environment variables, complete the Supabase repository/auth integration, then deploy. Use a custom domain only after the customer confirms branding/contact/legal content.

## Manual checks still required
- iPhone/Android image selection from camera roll.
- Real photographs and image compression quality.
- Customer's actual phone/address/service copy.
- Latvian/Russian/English wording.
- Supabase auth/session and storage integration before production.
- Privacy notice/consent requirements for enquiry data.

See `CUSTOMER_TEST_PLAN.md`, `CUSTOMER_FEEDBACK.md`, and `PRODUCTION_CHECKLIST.md`.


## GitHub Pages demo edition

This repository has been adapted for GitHub Pages static hosting. Dynamic vehicle routes were replaced with query-based static routes so vehicles created in browser-local demo mode can still be opened without rebuilding the site.

For the exact deployment procedure, see [`GITHUB_PAGES.md`](./GITHUB_PAGES.md).

Quick commands:

```bash
npm install
npm run dev
npm run build:pages
npm run deploy:pages
```

## v0.3 D.A.R. Motors branded edition

This edition adds:
- LV / RU / EN public UI with browser-persisted language selection;
- visual identity based on the supplied D.A.R. Motors workshop signage;
- real address and business identity data;
- Facebook and map/directions links;
- GitHub Pages-safe production base path `/dar-motors`;
- `.nojekyll` retained through `public/.nojekyll`;
- hardened demo admin redirect logic for trailing-slash/static hosting.

See `BUSINESS_DATA.md` for verified data and fields that still require client confirmation.
