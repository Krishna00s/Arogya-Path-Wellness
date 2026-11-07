# 03 — Architecture, backend and database

## Proposed stack — provisional until cost/load validation
- **Application:** Next.js + TypeScript (App Router), Tailwind CSS; modular monolith with server-side business logic.
- **Database:** PostgreSQL with migrations and strict relational constraints. **Hosting choice undecided:** managed PostgreSQL vs self-hosted on VPS; compare reliability, backups, operations and total cost.
- **Authentication:** Supabase Auth phone OTP **candidate**, with external India SMS provider/custom hook; confirm quotas, project inactivity, DLT onboarding, cost and provider compatibility. Auth is replaceable via an internal identity adapter. Never store OTP plaintext.
- **Payments:** Razorpay (UPI) and COD; payment server endpoints + signed webhook processing.
- **Media:** object storage/CDN (Cloudflare R2 candidate), not database BLOBs; keep private assets private.
- **Hosting:** paid always-on infrastructure candidate; Cloudflare DNS/CDN. Avoid production dependency on free services that sleep. Benchmark before sizing.

## Logical modules
`catalog`, `inventory`, `identity`, `customers`, `cart`, `checkout`, `orders`, `payments`, `fulfillment`, `admin`, `audit`. UI components cannot access DB directly; server handlers call services; services validate authorization and execute transactions.

## Core tables (starter model)
- `customers(id, auth_subject UNIQUE, phone_e164 UNIQUE, name, created_at, updated_at)` — phone number is sensitive; restrict access.
- `addresses(id, customer_id FK, recipient, line1, line2, city, state, pincode, phone, is_default)`.
- `categories(id, parent_id FK NULL, slug UNIQUE, name, is_active)`.
- `products(id, slug UNIQUE, name, description, category_id FK, status, created_at)`.
- `variants(id, product_id FK, sku UNIQUE, pack_size, price_minor, compare_at_minor NULL, tax_code, is_active)`.
- `product_media(id, product_id FK, object_key, alt_text, sort_order)`.
- `inventory_batches(id, variant_id FK, batch_code, expiry_date NULL, quantity_on_hand, quantity_reserved)` where appropriate; enforce nonnegative stock and reserved <= on-hand.
- `carts(id, customer_id FK NULL, guest_token_hash NULL, updated_at)` and `cart_items(cart_id FK, variant_id FK, quantity)`.
- `orders(id, public_id UNIQUE, customer_id FK, address_snapshot JSONB, currency, subtotal_minor, shipping_minor, tax_minor, total_minor, payment_method, payment_status, fulfillment_status, created_at)`.
- `order_items(id, order_id FK, variant_id FK NULL, sku_snapshot, name_snapshot, unit_price_minor, tax_minor, quantity)`.
- `payment_attempts(id, order_id FK, provider_order_id UNIQUE NULL, provider_payment_id UNIQUE NULL, amount_minor, status, created_at)`.
- `payment_webhook_events(provider_event_id UNIQUE, received_at, processed_at, status)` for deduplication.
- `order_status_history(id, order_id FK, actor_id NULL, from_status, to_status, created_at)`.
- `audit_logs(id, actor_id NULL, action, target_type, target_id, metadata_redacted, created_at)`.
- `staff_users(id, auth_subject UNIQUE, role, active)`.

Use UUIDs internally, integer paise for money, UTC timestamps, explicit foreign keys, constraints, indexes, soft-delete/archival rules where needed. Snapshot prices and delivery address in orders. Keep auth secrets outside database. No card data storage.

## API contract examples (subject to refinement)
- `GET /api/products`, `GET /api/products/:slug`, `GET /api/categories`.
- `POST /api/checkout/quote` — authenticated or cart-scoped; server-calculated totals.
- `POST /api/orders/cod` — idempotent, authenticated, validated address and stock.
- `POST /api/payments/razorpay/order` — creates pending order/payment attempt server-side.
- `POST /api/webhooks/razorpay` — raw-body signature verification, dedupe and transactionally update state.
- `GET /api/orders/:publicId` — owner or authorized staff only.
- `/api/admin/*` — staff authorization for every operation.

No client-supplied prices are trusted. Use request schemas (e.g. Zod), parameterized queries/ORM, explicit error codes, pagination and idempotency keys. Inventory reservation and order creation must be atomic; release reservations on payment timeout/cancel.

## Scalability
500 simultaneous browsing sessions is a target, **not a guaranteed server capacity**. Use CDN caching for public catalog, database connection pooling, indexes, pagination and efficient image delivery. Define load-test mix and latency/error budgets, then scale app and database separately if needed. 1,000+ registered users is a modest database requirement.
