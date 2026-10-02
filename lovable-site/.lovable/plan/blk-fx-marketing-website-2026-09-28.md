# BLK.FX marketing website

## Direction
Build a premium, editorial multi-page website using the supplied near-black/off-white palette, sparing orange accents, Geist typography, sharp geometry, and alternating full-width light/dark sections. Copy will stay direct, confident, plain-English, and use UK spelling.

## Site structure
- Create shared navigation, login provider menu, animated mobile menu, floating WhatsApp control, and large regulatory footer.
- Build `/` with all requested sections: hero and ticker, client proof, stats, services, pricing comparison and calculator, audiences, process, payment journey, infrastructure partners, FX.Exposure crossover, reviews, FAQs, closing audit CTA, and newsletter form.
- Build substantive routes for `/services`, `/who-we-help`, `/about`, `/providers`, `/insights`, and `/contact`.
- Add unique page metadata for every route and keep all navigation type-safe.

## Interactions and motion
- Add Lenis and GSAP for smooth scrolling, scroll-triggered reveals, hero perspective, SVG chart drawing, desktop pinned horizontal services, count-ups, growing comparison bars, marquees, and payment progress.
- Add a first-visit-only intro reveal, live-feel mock FX ticker, magnetic CTAs, subtle arrow/card movement, custom desktop cursor, draggable review carousel, calculator, accordions, login dropdown, mobile menu, and success notifications for frontend-only forms.
- Respect reduced-motion preferences and disable or simplify scroll effects on mobile where appropriate.

## Design system and implementation
- Define the complete colour, typography, spacing, shadow, motion, and focus system centrally with semantic tokens.
- Create reusable site primitives for page headers, section labels, calls to action, forms, service cards, ticker/marquee rows, and content bands.
- Use accessible semantic structure, keyboard-operable menus and accordions, visible focus states, labelled forms, and stable responsive layouts.
- Use text wordmarks for the requested client proof and partner identities; no placeholder imagery is needed for this highly typographic direction.

## Validation
- Check the generated routes and current preview diagnostics.
- Verify the central homepage and interactions at desktop and mobile sizes, including menu, calculator, accordion, carousel, and forms.
- Confirm reduced-motion behaviour, external links, metadata, and no visible overlap or clipping.

## Assumptions
- Forms remain frontend-only and show a confirmation message without sending data.
- Trustpilot review and provider login destinations will use the supplied links where available; the Trustpilot review CTA will open Trustpilot generally because no profile URL was supplied.
- Partner credentials and safeguarding copy will be factual but concise, based on the regulatory details supplied rather than adding unsupported claims.
