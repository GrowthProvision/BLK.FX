import type { providers } from "@/lib/site-data";

type Provider = (typeof providers)[number];

export function ProviderLogo({ provider, focusable = false }: { provider: Provider; focusable?: boolean }) {
  return <span className="provider-logo" tabIndex={focusable ? 0 : undefined} aria-label={focusable ? `${provider.displayName} logo` : undefined}>
    <img src={provider.logo} alt={provider.displayName} loading="lazy" />
  </span>;
}