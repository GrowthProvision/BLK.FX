# Ben's Lovable build, now the site (9 Oct 2026)

The site at the repo root is now a static copy of Ben's Lovable project
(Lovable project `70ef77c6`, exported to `D:\My Docs\Desktop\blk lovable`).
Design, layout, copy and motion are his, unchanged. It was rendered from his
React source and converted to plain HTML + one vanilla JS file so it runs on
GitHub Pages and stays WordPress-rebuildable (`06-wordpress-constraints.md`).

Next step: go page by page and bring across copy and elements from our
previous build.

## Page match: Ben's build vs our previous build

| Ben's page (live now) | Our previous build | Notes |
|---|---|---|
| `/` Home | `index-previous.html` (old homepage, archived next to it) | Ben's homepage absorbs our pricing, process, FAQ, newsletter and Who We Help teaser |
| `/services/` (one page, 6 anchored sections) | `services/index-previous.html` (hub) + 6 service pages still in place: `services/business-foreign-exchange/`, `international-payments/`, `multi-currency-accounts/`, `fx-risk-management-and-hedging/`, `commercial-finance/`, `private-client-fx/` | Biggest structural difference: Ben has no individual service pages. His hedging anchor is `#fx-risk-management-hedging`, our page slug is `fx-risk-management-and-hedging` |
| `/who-we-help/` | none (the `who we help/` folder is empty); homepage `#who` section | Ben includes Music & Entertainment and Creators & Influencers, which we had paused |
| `/providers/` "Provider Network" | `fintech-providers/` (still in place) | Ben renamed the page and URL |
| `/tools/` FX.Exposure | none (only the `#fxexposure` section on the FX Risk page) | New page |
| `/about/` | `about/our-story/` and `about/our-approach/` (both still in place) | Ben merges story, founder and approach into one page |
| `/insights/` + 55 article pages | `insights/index-previous.html` (12 cards, 2 linked) + `insights/blk-fx-vs-your-high-street-bank/index-previous.html` | Ben migrated all 55 posts with full text |
| `/contact/` | `contact/index-previous.html` | Ben adds brochure request + complaints copy |
| `/case-studies/furniture-fusion/` | none | Case studies were not on our roadmap (B10) |
| none | `newsletter/`, `blog/` (stale) | Ben folds the newsletter signup into page sections |

Old pages that did not collide with Ben's URLs were left exactly where they
were. Pages that did collide were copied to `index-previous.html` in the same
folder before being replaced, so their relative image paths still work.

## What changed in the conversion (behaviour only)

- React, Radix and Tailwind runtime removed. Ben's compiled stylesheet is
  `assets/site/site.css`; `assets/site/static.css` adds styles for the few
  native replacements (range sliders, select, toast).
- `assets/site/site.js` ports: nav dropdowns and mobile menu, accordions,
  regulatory disclosures, WhatsApp widget, cursor dot, intro loader, FX
  ticker, savings calculator, video poster, forms, insights filter, services
  sub-nav, the cobe hero globe, and all GSAP/Lenis motion.
- All content is in the HTML (accordion answers, menus and disclosures
  included), readable with JS off.
- FX ticker: Ben's server-side rate API can't run on a static host. Rates now
  load client-side from open.er-api.com (daily, no key) over his fallback values.
- Forms are front-end only, exactly as in Ben's build.
- Links are relative, so the site works under `/BLK.FX/` on GitHub Pages.

## Known gaps

- **Images are hot-linked from Ben's Lovable preview**
  (`id-preview--70ef77c6-...lovable.app/__l5e/assets-v1/...`). The export
  only contained pointers, not files (about 28MB across 90 images). They
  must be downloaded and self-hosted before handover or if Ben's project
  is deleted.
- Ben's build still has the open items from `07-decision-log.md` baked in:
  margin range 0.2–0.6% vs banks 1.0–3.5% (B1), Trustpilot 4.7/5 (B4), and
  "Transparent pricing" wording that `04-copy-rules.md` rule 2 flags.
- `robots` is `noindex, nofollow`, as Ben set it.
