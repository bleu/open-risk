import { PROTOCOLS } from "@/content/protocols";
import { TOKENS } from "@/content/tokens";

const PROTOCOLS_URL = "https://api.llama.fi/protocols";
const STABLECOINS_URL =
  "https://stablecoins.llama.fi/stablecoins?includePrices=true";

// ── Shared types ─────────────────────────────────────────────────────

interface DlProtocol {
  name: string;
  slug: string;
  symbol: string;
  tvl: number;
  mcap: number | null;
  category: string;
  parentProtocol?: string;
  chainTvls?: Record<string, number>;
}

interface DlStablecoin {
  id: string;
  name: string;
  symbol: string;
  circulating?: { peggedUSD: number };
}

// ── Shared fetch (deduplicates concurrent calls) ─────────────────────

let protocolsPromise: Promise<DlProtocol[]> | null = null;

function getProtocols(): Promise<DlProtocol[]> {
  if (!protocolsPromise) {
    protocolsPromise = fetch(PROTOCOLS_URL, {
      signal: AbortSignal.timeout(15_000),
    }).then((res) => {
      if (!res.ok) throw new Error(`DeFiLlama protocols API returned ${res.status}`);
      return res.json() as Promise<DlProtocol[]>;
    });
  }
  return protocolsPromise;
}

// ── Protocol TVL ─────────────────────────────────────────────────────

/** Maps our protocol ID → preferred DeFiLlama slug */
const PROTOCOL_SLUG_MAP: Record<string, string> = {
  spark: "sparklend",
  aave: "aave-v3",
  morpho: "morpho-blue",
  fluid: "fluid-lending",
  gearbox: "gearbox",
  euler: "euler-v2",
  compound: "compound-v3",
  liquity: "liquity-v2",
  uniswap: "uniswap-v3",
  curve: "curve-dex",
  balancer: "balancer-v2",
  "cow-swap": "cowswap",
  "1inch": "1inch",
  "0x-matcha": "0x",
  yearn: "yearn-finance",
  mellow: "mellow-core",
  pendle: "pendle",
  lido: "lido",
  "rocket-pool": "rocket-pool",
};

const PROTOCOL_NAME_KEYWORDS: Record<string, string[]> = {
  spark: ["spark"],
  aave: ["aave"],
  morpho: ["morpho"],
  fluid: ["fluid"],
  gearbox: ["gearbox"],
  euler: ["euler"],
  compound: ["compound"],
  liquity: ["liquity"],
  uniswap: ["uniswap"],
  curve: ["curve"],
  balancer: ["balancer"],
  "cow-swap": ["cowswap", "cow protocol"],
  "1inch": ["1inch"],
  "0x-matcha": ["0x protocol", "matcha"],
  yearn: ["yearn"],
  mellow: ["mellow"],
  pendle: ["pendle"],
  lido: ["lido"],
  "rocket-pool": ["rocket pool", "rocketpool"],
};

/**
 * Fetches live TVL data from DeFiLlama for all tracked protocols.
 * Returns a Map of protocolId → tvl (USD).
 */
export async function fetchTvl(): Promise<Map<string, number>> {
  const allProtocols = await getProtocols();

  const slugLookup = new Map<string, DlProtocol>();
  for (const p of allProtocols) {
    slugLookup.set(p.slug, p);
  }

  const tvlMap = new Map<string, number>();

  for (const protocol of PROTOCOLS) {
    const slug = PROTOCOL_SLUG_MAP[protocol.id];
    if (slug) {
      const matched = slugLookup.get(slug);
      if (matched) {
        let totalTvl = matched.tvl;
        if (matched.parentProtocol) {
          totalTvl = allProtocols
            .filter((p) => p.parentProtocol === matched.parentProtocol)
            .reduce((sum, p) => sum + p.tvl, 0);
        }
        tvlMap.set(protocol.id, totalTvl);
        continue;
      }
    }

    const keywords = PROTOCOL_NAME_KEYWORDS[protocol.id] ?? [protocol.id];
    for (const kw of keywords) {
      const byName = allProtocols.find((p) =>
        p.name.toLowerCase().includes(kw.toLowerCase()),
      );
      if (byName) {
        tvlMap.set(protocol.id, byName.tvl);
        break;
      }
    }
  }

  return tvlMap;
}

// ── Token market cap ─────────────────────────────────────────────────

/**
 * Fetches live market cap for all tracked tokens.
 *
 * Stablecoins → DeFiLlama stablecoins API (circulating supply ≈ mcap)
 * Other tokens → DeFiLlama /protocols API `mcap` field (best-effort)
 *
 * Returns a Map of tokenId → mcap (USD). Tokens without live data are omitted.
 */
export async function fetchTokenMcap(): Promise<Map<string, number>> {
  const [stablecoinsRes, allProtocols] = await Promise.all([
    fetch(STABLECOINS_URL, { signal: AbortSignal.timeout(15_000) }).then(
      (res) => {
        if (!res.ok)
          throw new Error(`DeFiLlama stablecoins API returned ${res.status}`);
        return res.json() as Promise<{ peggedAssets: DlStablecoin[] }>;
      },
    ),
    getProtocols(),
  ]);

  const mcapMap = new Map<string, number>();
  const stablecoins = stablecoinsRes.peggedAssets;

  // Build symbol → stablecoin lookup (case-insensitive, prefer largest circulating)
  const stablecoinBySymbol = new Map<string, DlStablecoin>();
  for (const sc of stablecoins) {
    const key = sc.symbol.toUpperCase();
    const existing = stablecoinBySymbol.get(key);
    if (
      !existing ||
      (sc.circulating?.peggedUSD ?? 0) >
        (existing.circulating?.peggedUSD ?? 0)
    ) {
      stablecoinBySymbol.set(key, sc);
    }
  }

  // Build symbol → best mcap from protocols (case-insensitive, prefer largest mcap)
  const protocolMcapBySymbol = new Map<string, number>();
  for (const p of allProtocols) {
    if (p.mcap != null && p.symbol) {
      const key = p.symbol.toUpperCase();
      const existing = protocolMcapBySymbol.get(key) ?? 0;
      if (p.mcap > existing) {
        protocolMcapBySymbol.set(key, p.mcap);
      }
    }
  }

  for (const token of TOKENS) {
    const symbolUpper = token.symbol.toUpperCase();

    if (token.type === "stablecoin") {
      // Match stablecoins by symbol
      const sc = stablecoinBySymbol.get(symbolUpper);
      if (sc?.circulating?.peggedUSD != null) {
        mcapMap.set(token.id, sc.circulating.peggedUSD);
        continue;
      }
    }

    // Try protocol mcap for any token type (covers DeFi tokens + fallback for stablecoins not in stablecoins API)
    const protocolMcap = protocolMcapBySymbol.get(symbolUpper);
    if (protocolMcap != null) {
      mcapMap.set(token.id, protocolMcap);
    }
  }

  return mcapMap;
}

// ── Risk Curators TVL ────────────────────────────────────────────────

export interface CuratorTvl {
  name: string;
  slug: string;
  tvl: number;
  ethTvl: number;
}

/**
 * Fetches live TVL for DeFiLlama "Risk Curators" category.
 * Returns a Map of curator slug → { name, slug, tvl, ethTvl }.
 */
export async function fetchCuratorsTvl(): Promise<Map<string, CuratorTvl>> {
  const allProtocols = await getProtocols();

  const curators = allProtocols.filter(
    (p) => p.category === "Risk Curators",
  );

  const curatorMap = new Map<string, CuratorTvl>();

  for (const c of curators) {
    curatorMap.set(c.slug, {
      name: c.name,
      slug: c.slug,
      tvl: c.tvl,
      ethTvl: c.chainTvls?.["Ethereum"] ?? 0,
    });
  }

  return curatorMap;
}
