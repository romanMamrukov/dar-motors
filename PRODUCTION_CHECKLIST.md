# Production checklist

## Validation gate
Do not expand scope until the customer has completed the test plan and confirms the inventory workflow has value.

## P0 before real data
- Wire repository to Supabase PostgreSQL.
- Implement Supabase email/password Auth and protected admin middleware.
- Store images in Supabase Storage; client-side resize/compress before upload.
- Enforce RLS using the included schema and test anon/authenticated access.
- Server-side Zod validation for vehicle mutations and leads.
- Add lead rate limiting / bot protection.
- Add destructive-action confirmation and audit timestamps.
- Replace demo contact/location data.
- Add privacy policy and retention rules for enquiries.

## P1 after customer feedback
- Proper image ordering + cover selection.
- Price/year/transmission filters if inventory size justifies them.
- LV/RU/EN dictionaries and locale routes.
- Mobile camera upload optimization.
- Sold archive behavior based on customer answer.

## Explicitly excluded until validation
Payments, financing integrations, complex CRM, AI, OCR, accounting, advanced analytics, native mobile app, microservices, complex permissions, SS.com automation, Facebook automation.
