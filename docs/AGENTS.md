# Antigravity Engineering Instructions — Arogya Path Wellness

You are implementing an owner-directed production e-commerce application. **Read all `docs/*.md` before editing code.** If docs disagree or an important choice is unspecified, ask rather than inventing a policy.

## Non-negotiables
- Work milestone by milestone. Present plan before changes; owner approves art direction and major architecture choices.
- Use TypeScript strict mode, typed schemas, small modules, readable code, linting and tests.
- Never trust frontend prices, stock, user IDs or payment statuses; enforce validation/authorization server-side.
- Do not implement OTP cryptography or session security from scratch when vetted libraries/services suffice.
- Do not expose keys, tokens, personal data or raw OTPs in code, logs, screenshots or commits.
- Do not mark Razorpay orders paid based only on client callbacks; verify server-side and process signed webhooks idempotently.
- Make order/inventory writes transactional and idempotent; handle concurrency and retries.
- Protect all admin endpoints; least privilege and strong staff authentication.
- Design mobile-first and accessible; do not copy third-party logos, imagery, copy or code from the reference website.
- Prefer inexpensive, maintainable services, but never trade away backups, security or payment integrity to reach a free tier.
- Write migration and rollback notes for schema changes; keep secrets in environment variables and provide `.env.example` with placeholders only.
- Never claim the 500-concurrent-user target is met without a representative load test and documented results.

## Required output per task
Summary, changed files, assumptions, security impact, test commands/results, remaining risks and next recommended task. Do not silently expand scope.
