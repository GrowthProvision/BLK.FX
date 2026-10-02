# BLK.FX density and copy refinement

## What will change
- Tighten the shared visual system site-wide: section spacing, headline and body scale, card sizing, grid gaps, inner-page headers, and footer height.
- Preserve the existing loader, smooth scrolling, scroll reveals, pinned services, counters, tickers, marquees, cursor, and journey animation.
- Recompose the homepage into a shorter flow: add the benefit ticker, compact five-card differentiators, client-retention strip, expanded service copy, combined process/journey area, denser providers and reviews, video placeholder, and newsletter within the closing area.
- Add the supplied verbatim copy and figures to About, Who We Help, Providers, reviews, closing CTA, and newsletter.
- Update the WhatsApp tooltip and retain UK spelling throughout.

## Technical details
- Keep marketing facts in the shared typed data module and reusable marketing sections.
- Adjust the horizontal services scroll distance naturally through narrower cards; preserve the existing GSAP logic and all motion markers.
- Use shared CSS classes and tokens instead of route-specific scale overrides wherever possible.
- Verify desktop and mobile layouts, interactions, console output, and the generated build.

## Assumptions
- The video remains a non-playing poster placeholder with an accessible play control, as requested.
- Existing content remains unless it is superseded by the supplied Round 2 copy or merged to reduce page length.