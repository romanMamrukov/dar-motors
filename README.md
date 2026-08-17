# D.A.R. Motors — Motorbase Client Configuration

A branded customer-validation build of Motorbase for vehicle sales and inventory management.

[Open the live demo](https://romanmamrukov.github.io/dar-motors/) · [View the reusable Motorbase core](https://github.com/romanMamrukov/auto-repair-shop) · [Review the customer test plan](./CUSTOMER_TEST_PLAN.md)

## Purpose

This repository tests one concrete workflow: staff should be able to publish vehicles with images and descriptions, update availability, and receive enquiries without asking a developer to edit the website.

It is a **proposal and validation demo**, not evidence of a completed client deployment. Branding and business information are included to make customer testing realistic; unverified fields are documented in [`BUSINESS_DATA.md`](./BUSINESS_DATA.md).

## What can be tested

- LV / RU / EN public experience
- vehicle catalogue and static detail routes
- manufacturer, fuel, and availability filters
- staff-oriented admin dashboard
- create, edit, delete, and multi-image preview flows
- Draft, Available, Reserved, and Sold inventory states
- New, Contacted, and Closed lead states
- browser-persisted demo data
- GitHub Pages-compatible static export

## Demo boundary

All admin writes are stored in the current browser through `localStorage`. They are not shared with another device and can be lost when browser data is cleared.

Do not enter real customer, employee, enquiry, or inventory data. The demo login is not production authentication.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open the application and `/admin` using the demo-only credentials documented in the interface.

## Validate

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Manual customer testing should also cover:

- adding inventory from an iPhone and Android photo library;
- editing and selling a vehicle from a mobile browser;
- Latvian, Russian, and English wording;
- enquiry handling from submission to closure;
- the information staff need but the current form does not capture.

## Production path

The repository includes a Supabase schema, RLS policies, and a Storage bucket migration. A production release still requires:

1. real Supabase Auth and session handling;
2. database-backed vehicles, images, and leads;
3. server-side validation and rate limiting;
4. image compression, file validation, and upload failure recovery;
5. confirmed company, contact, legal, and privacy content;
6. monitoring, backups, and a tested recovery procedure;
7. removal of every demo credential and `localStorage` write path.

## Repository guide

- [`CUSTOMER_TEST_PLAN.md`](./CUSTOMER_TEST_PLAN.md) — structured validation session
- [`CUSTOMER_FEEDBACK.md`](./CUSTOMER_FEEDBACK.md) — feedback capture
- [`PRODUCTION_CHECKLIST.md`](./PRODUCTION_CHECKLIST.md) — go-live gates
- [`GITHUB_PAGES.md`](./GITHUB_PAGES.md) — static demo deployment
- [`BUSINESS_DATA.md`](./BUSINESS_DATA.md) — verified and pending business details

## Security

This repository is not approved for production data. See [`SECURITY.md`](./SECURITY.md) before reporting a vulnerability or sharing sensitive details.

## Licence

No open-source licence is currently declared. The source is available for evaluation only unless explicit permission is granted.
