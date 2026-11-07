# Arogya Path Wellness — reference-led UI specification

**Reference:** https://www.arayurveda.shop/ (inspected November 2026). This is a layout specification, not a claim to have extracted Figma or exact DOM pixel dimensions. The SVG is importable into Figma and uses schematic blocks. Use original imagery, copy and branding.

## Source inspection coverage
- Homepage: announcement ticker, header, hero carousel, ten category tiles, concern tabs, product groups, split campaigns, full-width men's campaign, discounted products, promises, Ayurveda campaign, reviews, footer.
- Products listing `/collections/products`: title, filter/sort controls, 2–5-column density options, repeated product cards, pagination.
- Product `/products/nirogi-pachan-churna`: image gallery, rating, price, pack offer, availability, add to cart and buy now, trust strip, specifications, Watch & Buy, benefits, ingredients, how-to-use, FAQs and further content.
- `/pages/contact`, `/pages/about-us`, `/pages/faq`: accessible pages; treat as standard content templates until visually inspected in a browser.
- Category routes, policy pages, cart drawer and account entry: link structures seen; exact interaction and mobile geometry not independently measured.
- Payment and login provider flows: not inspected; use our own approved OTP → address → COD/UPI checkout design.

## Design dimensions (implementation targets, not measurements from AR Ayurveda)
| Element | Mobile 390px | Desktop 1440px |
|---|---|---|
| Outer gutter | 12–16px | 28–48px |
| Main content max width | fluid | 1280–1360px |
| Announcement | 22–28px | 24–30px |
| Header | 56–64px | 64–80px |
| Hero | image ratio about 1.25–1.6 | 3.2–4.0 wide |
| Category grid | 2 columns, 8px gap | 5 columns, 12–18px gap |
| Product grid | 2 columns, 8–10px gap | 4 columns, 12–18px gap |
| Product image | square or slightly portrait | square or slightly portrait |
| Section spacing | 24–36px | 36–60px |
| CTA height | 44–48px | 36–44px |
| Sticky bottom navigation | 56–64px | none |

## Home section order — preserve this exactly
1. Slim announcement ticker.
2. Compact branded header and desktop navigation.
3. Wide, photographic product hero carousel — not a generic text-on-gradient SaaS hero.
4. **Top Categories**: ten photo tiles with green bottom caption bands.
5. **Shop By Concern**: horizontal category tabs and dense four-card desktop / two-card mobile products.
6. Two side-by-side campaign banners on desktop, stacked on mobile.
7. **Our Products**: product cards.
8. Wide men's wellness promotional banner.
9. **Top Discounted Products**.
10. Four compact service promises.
11. Wide Ayurveda brand image campaign.
12. Customer reviews (real only in production).
13. Information-heavy footer.

## Product card anatomy
1. Product photo fills upper 65–72% of card; minimal padding.
2. Name (2 lines max), star rating only when genuine, current price, crossed-out MRP when genuine, savings badge.
3. Bottom full-width green BUY NOW or add-to-cart action.
4. Do not create floating pastel feature cards or oversized white space.

## Page templates
### Collection / category
Shared header → title and optional breadcrumb → filter/sort bar → product grid → pagination → footer. Mobile: filter sheet, sort control, two columns. Desktop: compact filters and four columns.

### Product details
Shared header → media gallery and purchase panel (two columns on desktop, stacked on mobile) → product title, ratings if genuine, pack choice, price, stock, cart and buy now → assurance icons → specifications → benefits/ingredients/how to use → FAQ → real reviews → related products → footer. Mobile may use sticky purchase bar.

### Cart
Use drawer or page: items with photo, quantity stepper, removal, coupon if supported, totals, checkout CTA. Never calculate final price exclusively in browser.

### OTP / checkout (our own flow)
Mobile number → SMS OTP verification → name for first-time users → address and pincode → shipping/total review → COD or Razorpay UPI → success/pending/failure. COD orders remain pending confirmation. Do not copy a third-party checkout.

### Informational pages
About, Contact, FAQ, shipping, returns, privacy and terms use the shared shell and a narrow readable text container. Content and business claims require owner approval.

## Visual fidelity acceptance gate
- Compare screenshots side-by-side at 390px and 1440px, with matching viewport and zoom.
- Verify section sequence, widths, image-to-text ratio, card density, header heights, green label bands, typography scale and gutters.
- No generic SaaS-style gradient hero, decorative icon grids, or arbitrary layout changes.
- Check empty/loading/error states, keyboard navigation, image dimensions and mobile overflow.
- Owner signs off on **visual fidelity** before proceeding to backend milestones.

## Notes
The reference is a third-party storefront. Recreate its functional layout patterns, but not its logo, photos, exact product copy, fake testimonials, or unsupported claims. The SVG is a wireframe to align structure; final visual comps require licensed product photography and owner-approved branding.
