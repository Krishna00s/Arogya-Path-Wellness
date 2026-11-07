# 05 — Roadmap and decision log

## Milestones — complete one at a time
**M0 — Discovery & approval:** confirm service area, delivery pricing, COD policy, actual catalog/claims, reference-page audit, design mockups, hosting and SMS budget.

**M1 — Foundation:** repository, lint/format/typecheck, CI, environment separation, PostgreSQL schema/migrations, seed data, app shell, reusable UI tokens.

**M2 — Catalog:** homepage, categories, product details, search/filter/sort, responsive images, admin product/inventory CRUD.

**M3 — Identity & checkout:** OTP integration with test adapter, secure sessions, addresses, cart, quote and order creation, COD workflow.

**M4 — UPI & operations:** Razorpay test mode, signed webhooks, retries/reconciliation, admin order processing, notifications if approved.

**M5 — Hardening & launch:** legal/policy content, accessibility, SEO, observability, backup restore, security checks, 500-concurrent-browser load test, production rollout.

## Decision register
| Decision | Current position | Status |
|---|---|---|
| Brand | Arogya Path Wellness | Confirmed |
| Legal business | Arogya Path Marketing (GST registered, per owner) | Confirmed |
| Product scope | Ayurvedic/herbal, wellness, supplements, healthcare | Confirmed; individual compliance review needed |
| Customer login | Mobile OTP, first-time name | Confirmed flow |
| Payment | COD and Razorpay UPI | Confirmed |
| COD confirmation | Manual contact before fulfillment | Confirmed |
| Users | 1,000+ records; 500 concurrent visitors performance target | Confirmed target, untested |
| DB | PostgreSQL | Proposed |
| Auth | Supabase Auth + Indian SMS provider | Candidate; quotas/provider setup must be verified |
| Media | Object storage/CDN | Proposed |
| Hosting | Always-on paid app + reliable DB/backup plan | Not selected |
| UI | Inspired by AR Ayurveda, original brand/assets | Needs visual approval |

## Open questions for owner
1. Launch delivery area: local only, selected pincodes or nationwide?
2. Shipping/COD fees, free-shipping threshold and returns policy?
3. Product list, SKUs, photos, ingredient labels, stock, tax and prices available in what format?
4. Budget ceiling for hosting, backups, SMS and one-time compliance onboarding?
5. Should customers place multi-product orders at launch, or Buy Now only? (Recommend both.)
6. Which team members need admin access and what permissions?
7. Actual DLT registration fee, sender ID and SMS provider integration verified?

## Antigravity task format
For every milestone ask for: (1) implementation plan and affected files, (2) risk/assumptions, (3) incremental code, (4) migrations/tests, (5) commands and test results, (6) owner review checklist. Do not proceed to the next milestone without approval.
