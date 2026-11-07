# 01 — Product requirements and customer journeys

## MVP audience and catalog
Indian customers purchasing Ayurvedic/herbal products, wellness, supplements and healthcare products. Admins manage products, stock, orders and customer support. Product legality, permitted claims, labelling and category-specific licences must be verified before listing; do not assume all products can be sold under the same rules.

## Customer-facing pages
- `/` Home: announcement, header, search, hero, category tiles, shop-by-concern, featured/bestsellers, offers, trust section, footer.
- `/shop` Product listing: categories, sorting, pagination, filters (availability, price, type).
- `/category/[slug]` Category listing.
- `/product/[slug]` Images, price, tax/pack size, description, ingredients/usage/warnings as applicable, stock, delivery info, Buy Now/Add to Cart.
- `/search` Search results and empty states.
- `/cart` Cart editing, totals, checkout.
- `/checkout` Phone OTP gate, first-time name, address, payment selection, order review.
- `/order/[publicId]` Confirmation and order status (protected against unauthorized access).
- `/account` Profile, saved addresses, order history, logout.
- `/about`, `/contact`, `/faq`, `/shipping-policy`, `/returns-policy`, `/privacy-policy`, `/terms`.
- Useful error pages: 404, unavailable product, payment failed/pending, session expired.

## Checkout — owner-approved intent
1. Guest browses without login; selects product(s); Buy Now or Checkout.
2. If unauthenticated: request mobile number, send OTP, verify; returning customer keeps existing name/address; new customer supplies name.
3. Capture or select delivery address; validate required fields and serviceability.
4. Server rechecks product availability, totals, taxes, shipping and discount rules. Customer confirms.
5. **COD:** create order with `payment_method=COD`, `payment_status=UNPAID`, `fulfillment_status=AWAITING_CONFIRMATION`; show “Order placed — we will contact you to confirm.” Admin confirms before dispatch.
6. **UPI:** server creates order in pending state and Razorpay payment order; client opens Razorpay checkout; server verifies signatures/webhooks and independently confirms final payment. Never trust client-side success alone.
7. Display status, send notifications only if configured, and keep a full order history.

## Admin MVP
Role-protected `/admin`: dashboard, catalog/categories, product images, variants, inventory/batches and expiries where relevant, customer list (least-privilege), orders and COD confirmation, payments/refunds status, delivery status, audit log. No unrestricted public access. Admin login should use stronger authentication than SMS-only customer login (e.g. MFA).

## Not in first release unless approved
Loyalty points, subscriptions, complex coupons, multi-warehouse, marketplace sellers, AI recommendations, mobile apps, automatic shipping-carrier integration, public product reviews (can be later).

## Important UX states
Loading/skeleton, no results, out-of-stock, OTP cooldown/expired/invalid, payment pending/failed, double-click prevention, retry without duplicate orders, invalid pincode, COD not available, canceled order, refund pending.
