<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all BLK.FX marketing content in shared typed data modules and reusable sections so every route stays visually and factually consistent.
- Run GSAP and Lenis only after hydration through the shared motion provider so SSR remains safe.
- Store app-served media as Lovable asset pointers and reference their CDN URLs through typed shared data or direct JSON imports, keeping the repository binary-free.
- Render the official BLK.FX mark through the shared inline Logo component so its foreground follows context while its orange dot stays fixed.
- Render partner artwork through the shared ProviderLogo component so sizing and monochrome-to-colour behaviour stay consistent.
- Keep detailed client outcomes on dedicated `/case-studies/*` routes so home and audience pages can stay compact.
- Run AI exposure summaries through a server function calling Lovable AI with streamed Responses, keeping the key and prompts server-side; client entries persist in localStorage only because the site has no accounts.
