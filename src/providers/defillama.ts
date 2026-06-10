import { fetchJSON } from "../lib/http.js";
import { writeJSON, dataDir } from "../lib/fs.js";
import type { ProviderFetcher, FetchReport } from "../lib/types.js";

// ── DeFiLlama API endpoints (all free, no auth) ──────────────────────
const PROTOCOLS_URL = "https://api.llama.fi/protocols";
const HACKS_URL = "https://api.llama.fi/hacks";
const FEES_URL =
  "https://api.llama.fi/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true";

// ── Protocol matching ─────────────────────────────────────────────────

/** Maps our protocol ID → preferred DeFiLlama slug */
const SLUG_MAP: Record<string, string> = {
  spark: "sparklend",
  aave: "aave-v3",
  morpho: "morpho-blue",
  fluid: "fluid",
  gearbox: "gearbox-v3",
  euler: "euler-v2",
  compound: "compound-v3",
  liquity: "liquity-v2",
  uniswap: "uniswap-v3",
  curve: "curve-dex",
  balancer: "balancer-v2",
  "cow-swap": "cowswap",
  "1inch": "1inch-network",
  "0x-matcha": "0x",
  yearn: "yearn-finance",
  mellow: "mellow-protocol",
  pendle: "pendle",
  lido: "lido",
  "rocket-pool": "rocket-pool",
};

/** Fallback name keywords when slug doesn't match */
const NAME_KEYWORDS: Record<string, string[]> = {
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

// ── Types ─────────────────────────────────────────────────────────────

interface DlProtocol {
  id: string;
  name: string;
  slug: string;
  tvl: number;
  change_1d: number | null;
  change_7d: number | null;
  audits: string;
  audit_links?: string[];
  parentProtocol?: string;
}

interface DlHack {
  name: string;
  amount: number;
  date: number;
  classification: string;
  technique: string;
  chain: string[];
  defillamaId?: string;
  returnedFunds?: number;
}

interface DlFeesResponse {
  protocols: Array<{
    name: string;
    defillamaId: string;
    total24h: number | null;
    total7d: number | null;
    total30d: number | null;
    totalAllTime: number | null;
  }>;
}

// ── Helpers ───────────────────────────────────────────────────────────

function findProtocol(
  slugLookup: Map<string, DlProtocol>,
  allProtocols: DlProtocol[],
  protocolId: string,
): DlProtocol | undefined {
  // Try direct slug match first
  const slug = SLUG_MAP[protocolId];
  if (slug) {
    const bySlug = slugLookup.get(slug);
    if (bySlug) return bySlug;
  }

  // Fallback: name keyword search
  const keywords = NAME_KEYWORDS[protocolId] ?? [protocolId];
  for (const kw of keywords) {
    const byName = allProtocols.find((p) =>
      p.name.toLowerCase().includes(kw.toLowerCase()),
    );
    if (byName) return byName;
  }

  return undefined;
}

/** Collect the matched protocol's ID + all sibling version IDs (same parent) */
function collectRelatedIds(
  primary: DlProtocol,
  allProtocols: DlProtocol[],
): Set<string> {
  const ids = new Set<string>();
  ids.add(primary.id);

  if (primary.parentProtocol) {
    for (const p of allProtocols) {
      if (p.parentProtocol === primary.parentProtocol) {
        ids.add(p.id);
      }
    }
  }

  return ids;
}

// ── Fetcher ───────────────────────────────────────────────────────────

const defillama: ProviderFetcher = {
  name: "DeFiLlama",
  slug: "defillama",

  async fetch(): Promise<FetchReport> {
    const start = Date.now();
    const filesWritten: string[] = [];
    const errors: string[] = [];

    // Fetch all 3 endpoints in parallel
    console.log("  [defillama] Fetching protocols, hacks, and fees...");
    const [allProtocols, allHacks, feesResponse] = await Promise.all([
      fetchJSON<DlProtocol[]>(PROTOCOLS_URL),
      fetchJSON<DlHack[]>(HACKS_URL),
      fetchJSON<DlFeesResponse>(FEES_URL),
    ]);

    console.log(
      `  [defillama] Loaded ${allProtocols.length} protocols, ${allHacks.length} hacks, ${feesResponse.protocols?.length ?? 0} fee entries`,
    );

    // Build slug → protocol lookup
    const slugLookup = new Map<string, DlProtocol>();
    for (const p of allProtocols) {
      slugLookup.set(p.slug, p);
    }

    const index: Array<{
      protocolId: string;
      defillamaSlug: string;
      tvl: number;
      tvlChange7d: number | null;
      audited: boolean;
      hackCount: number;
      hackLossUsd: number;
    }> = [];

    for (const protocolId of Object.keys(SLUG_MAP)) {
      try {
        const matched = findProtocol(slugLookup, allProtocols, protocolId);

        if (!matched) {
          errors.push(`${protocolId}: no DeFiLlama match found`);
          continue;
        }

        // Collect all related version IDs for aggregation
        const relatedIds = collectRelatedIds(matched, allProtocols);

        // Aggregate hacks across all related protocol versions
        const protocolHacks = allHacks.filter((h) => {
          if (h.defillamaId && relatedIds.has(h.defillamaId)) return true;
          // Name-based fallback
          const keywords = NAME_KEYWORDS[protocolId] ?? [protocolId];
          const hackName = h.name.toLowerCase();
          return keywords.some((kw) => hackName.includes(kw.toLowerCase()));
        });

        const hackCount = protocolHacks.length;
        const hackLossUsd = protocolHacks.reduce(
          (sum, h) => sum + (h.amount || 0),
          0,
        );

        const entry = {
          protocolId,
          defillamaSlug: matched.slug,
          tvl: matched.tvl,
          tvlChange7d: matched.change_7d ?? null,
          audited:
            matched.audits !== "0" &&
            matched.audits != null &&
            matched.audits !== "",
          hackCount,
          hackLossUsd,
        };

        // Write individual protocol file
        const outPath = dataDir("defillama", `${protocolId}.json`);
        await writeJSON(outPath, {
          ...entry,
          auditLinks: matched.audit_links ?? [],
          hacks: protocolHacks,
        });
        filesWritten.push(outPath);

        index.push(entry);

        console.log(
          `  [defillama] ${protocolId}: slug=${matched.slug} Δ7d=${entry.tvlChange7d?.toFixed(2) ?? "N/A"}% audited=${entry.audited} hacks=${hackCount} loss=$${hackLossUsd.toLocaleString()}`,
        );
      } catch (err) {
        errors.push(
          `${protocolId}: ${err instanceof Error ? err.message : err}`,
        );
        console.error(
          `  [defillama] ERROR ${protocolId}: ${err instanceof Error ? err.message : err}`,
        );
      }
    }

    // Write index
    const indexPath = dataDir("defillama", "_index.json");
    await writeJSON(indexPath, {
      protocols: index,
      fetchedAt: new Date().toISOString(),
    });
    filesWritten.push(indexPath);

    return {
      provider: "defillama",
      filesWritten,
      errors,
      durationMs: Date.now() - start,
    };
  },
};

export default defillama;

if (
  process.argv[1] &&
  import.meta.url.endsWith(process.argv[1].replace(/.*\//, ""))
) {
  defillama.fetch().then((r) => {
    console.log(
      `\nDeFiLlama: ${r.filesWritten.length} files, ${r.errors.length} errors, ${r.durationMs}ms`,
    );
    if (r.errors.length) console.error("Errors:", r.errors);
  });
}
