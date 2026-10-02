import { createFileRoute } from "@tanstack/react-router";

const PAIRS = ["GBP/USD", "GBP/EUR", "EUR/GBP", "EUR/USD", "USD/CAD", "GBP/AED", "AUD/GBP", "GBP/CHF", "USD/JPY", "GBP/ZAR"] as const;
const CURRENCIES = "USD,EUR,CAD,AED,AUD,CHF,JPY,ZAR";
const TTL = 120_000;

type Rate = { pair: string; rate: number; change: number | null };
type Payload = { status: "live" | "delayed"; updatedAt: string; previousCloseDate: string | null; rates: Rate[] };
let cache: { at: number; data: Payload } | null = null;
let inflight: Promise<Payload | null> | null = null;
let previousCloseCache: { ukDate: string; closeDate: string; rates: Record<string, number> } | null = null;
let previousCloseFailedDate: string | null = null;

function ukDateString(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function previousBusinessDay(ukDate: string) {
  const date = new Date(`${ukDate}T12:00:00Z`);
  do date.setUTCDate(date.getUTCDate() - 1); while (date.getUTCDay() === 0 || date.getUTCDay() === 6);
  return date.toISOString().slice(0, 10);
}

function derivePairs(source: Record<string, number>) {
  const values: Record<string, number> = { ...source, GBP: 1 };
  const pairs = PAIRS.map((pair) => {
    const [base, quote] = pair.split("/") as [string, string];
    return { pair, rate: (values[quote] ?? Number.NaN) / (values[base] ?? Number.NaN) };
  });
  return pairs.every(({ rate }) => Number.isFinite(rate)) ? pairs : null;
}

async function fetchRates(url: string, key: string, source: string) {
  const response = await fetch(url, { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(5000) });
  if (!response.ok) { console.error(`[fx-rates] ${source} upstream status`, response.status); return null; }
  const json = (await response.json()) as { rates?: Record<string, number> };
  const pairs = derivePairs(json.rates ?? {});
  if (!pairs) console.error(`[fx-rates] incomplete ${source} upstream data`);
  return pairs;
}

async function getPreviousClose(key: string) {
  const ukDate = ukDateString();
  if (previousCloseCache?.ukDate === ukDate) return previousCloseCache;
  if (previousCloseFailedDate === ukDate) return null;
  const closeDate = previousBusinessDay(ukDate);
  try {
    const pairs = await fetchRates(`https://api.fxratesapi.com/historical?date=${closeDate}&base=GBP&currencies=${CURRENCIES}&places=6`, key, "historical");
    if (!pairs) { previousCloseFailedDate = ukDate; return null; }
    previousCloseCache = { ukDate, closeDate, rates: Object.fromEntries(pairs.map(({ pair, rate }) => [pair, rate])) };
    previousCloseFailedDate = null;
    return previousCloseCache;
  } catch (error) {
    console.error("[fx-rates] historical upstream error", error instanceof Error ? error.message : error);
    previousCloseFailedDate = ukDate;
    return null;
  }
}

async function fetchUpstream(): Promise<Payload | null> {
  const key = process.env["FXRATESAPI_KEY"];
  if (!key) { console.error("[fx-rates] FXRATESAPI_KEY missing"); return null; }
  try {
    const [current, previous] = await Promise.all([
      fetchRates(`https://api.fxratesapi.com/latest?base=GBP&currencies=${CURRENCIES}&places=6`, key, "latest"),
      getPreviousClose(key),
    ]);
    if (!current) return null;
    const rates = current.map(({ pair, rate }) => {
      const prior = previous?.rates[pair];
      return { pair, rate, change: typeof prior === "number" && prior !== 0 ? ((rate / prior) - 1) * 100 : null };
    });
    return { status: "live", updatedAt: new Date().toISOString(), previousCloseDate: previous?.closeDate ?? null, rates };
  } catch (e) {
    console.error("[fx-rates] upstream error", e instanceof Error ? e.message : e);
    return null;
  }
}

export const Route = createFileRoute("/api/public/fx-rates")({
  server: {
    handlers: {
      GET: async () => {
        let data: Payload | null = null;
        if (cache && Date.now() - cache.at < TTL) data = cache.data;
        else {
          inflight ??= fetchUpstream().finally(() => { inflight = null; });
          const fresh = await inflight;
          if (fresh) { cache = { at: Date.now(), data: fresh }; data = fresh; }
          else if (cache) data = { ...cache.data, status: "delayed" };
        }
        if (!data) return Response.json({ status: "unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
        return Response.json(data, { headers: { "Cache-Control": data.status === "live" ? "public, s-maxage=120, stale-while-revalidate=60" : "public, s-maxage=30" } });
      },
    },
  },
});
