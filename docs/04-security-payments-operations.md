# 04 — Security, payment integrity and operations

## Authentication
- Phone OTP via provider; Supabase Auth is a candidate, not a locked decision.
- Confirm actual project-wide SMS limits, per-phone cooldown, provider capacity and pricing before launch.
- Rate-limit by phone/IP/device where appropriate; CAPTCHA/risk controls for abuse; monitor SMS spending.
- Use fake SMS adapter/test phone identities in local and automated tests; never hardcode a universal bypass in production.
- HttpOnly Secure SameSite cookies, session expiration/revocation, CSRF defenses where applicable; no tokens in localStorage by default.
- Staff uses separate roles and stronger authentication/MFA; do not let customer OTP grant admin rights.

## Razorpay and COD
- Create amounts only on server using database prices.
- Razorpay secret keys never shipped to client; validate signature on server; verify webhook signatures using raw request body; idempotently handle duplicate/out-of-order webhooks.
- `payment_status` independent from `fulfillment_status`; paid orders cannot be inferred from a redirect alone.
- COD starts `AWAITING_CONFIRMATION`; admin verifies customer and stock before processing. Log changes.
- Handle failed/pending payments, delayed webhook delivery, retries, reconciliation, cancellations and refunds.
- Preserve order item snapshots and payment attempts; do not silently overwrite financial history.

## Privacy and compliance
- Collect only needed customer name, verified phone, addresses and orders. Explain use and retention in privacy notice.
- Enforce least-privilege staff access, audit access to sensitive records, protect exports and backups.
- Validate Indian rules for consumer protection, privacy, GST invoices, SMS DLT, Ayurvedic/health product classifications, permitted claims and labelling with a qualified professional before launch.
- Do not store payment credentials or OTP plaintext. Redact secrets, phone numbers and addresses from logs.

## Deployment and resilience
- Separate development, staging and production credentials/databases.
- HTTPS, environment secrets, managed DNS, patching, firewall, restricted DB network access, automated dependency scanning.
- Automated encrypted off-server backups, documented retention and **tested restore**; verify recovery point/time targets before launch.
- Monitoring: uptime, application errors, DB storage, CPU/RAM, failed payment webhooks, OTP failures, order-processing anomalies, backup failures.
- Migration strategy: versioned, reversible where possible; backups before risky migrations; no destructive schema changes without review.

## Minimum release tests
- Functional: new/returning user, OTP expiry/cooldown, address edits, cart persistence, COD confirmation, UPI paid/pending/failed, cancellations.
- Security: cross-user order access denied, admin access denied, invalid signatures rejected, input validation, brute-force and replay protection.
- Concurrency: no double order on retry, no double payment confirmation, no overselling on simultaneous orders.
- Performance: simulate 500 concurrent **browsers** with realistic browsing/checkout mix; agree p95 latency and error-rate thresholds before signoff. Test separately for OTP bursts and payment webhooks.
- Disaster recovery: restore a recent backup to a fresh environment and validate row counts/order records.
