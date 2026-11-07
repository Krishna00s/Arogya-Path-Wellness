# 02 — UI/UX design specification

## Direction
Modern, trustworthy Indian Ayurveda/wellness store. Take inspiration from AR Ayurveda's **information architecture and commerce patterns**, not its exact branding/assets. Brand name: **Arogya Path Wellness**. Creative director (owner) approves every visual choice.

## Provisional design tokens (approval required)
- Primary forest green `#1D573C`; deeper green `#123E2C`; cream `#F8F5EC`; warm accent `#C89C50`; text `#1F2923`; neutral borders `#E5E8E1`.
- Typography: accessible web font such as Inter for UI; optional tasteful serif for headings (license and performance checked).
- 8px spacing rhythm, consistent radii (8–16px), visible focus states, restrained shadows, large touch targets.
- Avoid unverified badges, medical claims, fabricated reviews, fake scarcity or misleading discounts.

## Homepage sections (desktop and mobile)
1. Announcement/shipping message (only if factual).
2. Sticky responsive header: brand, search, category menu, account, cart.
3. Hero with one clear CTA; responsive art direction and optimized image.
4. Shop by category / concern (only legitimate categories and claims).
5. Featured products and bestsellers: reusable product cards.
6. Promotional collections (only real promotions).
7. Trust/service information: shipping, support, authenticity (verified claims only).
8. FAQ preview and comprehensive footer with contact and policies.

## Reusable components
`Header`, `MobileNav`, `SearchBox`, `Hero`, `CategoryTile`, `ProductCard`, `Price`, `QuantityPicker`, `StockBadge`, `ProductGallery`, `FilterDrawer`, `CartDrawer`, `OTPDialog`, `AddressForm`, `PaymentSelector`, `OrderSummary`, `StatusTimeline`, `Footer`, `Toast`, `Skeleton`, `EmptyState`.

## Responsive rules
- Design mobile-first at ~360px width, then tablet (~768px) and desktop (~1280px); no horizontal scrolling.
- Mobile: compact header, accessible menu/search, 2-column product cards when readable, full-width checkout, sticky primary action where helpful.
- Desktop: full navigation, 3–4-column product grid, sidebar filters, checkout summary beside form.
- Buttons/tap targets ideally >=44×44 CSS pixels; clear labels and validation.

## Accessibility and performance
Semantic HTML, keyboard navigation, proper form labels, sufficient contrast, alt text, screen-reader OTP errors, reduced-motion support. Use optimized AVIF/WebP images, lazy-load below-fold media, avoid autoplay video and layout shifts. Target Core Web Vitals (p75): LCP <=2.5s, INP <=200ms, CLS <=0.1 on relevant device/connection segments.

## Required design deliverables before frontend implementation
Owner-approved desktop and mobile views for home, catalog, product detail, OTP modal, checkout (COD/UPI), order confirmation, account, admin dashboard. Real products/photos/copy supplied or licensed; generated mockups are concept references, not production assets.
