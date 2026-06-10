import { fetchJSON } from "../lib/http.js";
import { writeJSON, dataDir } from "../lib/fs.js";
import type { ProviderFetcher, FetchReport } from "../lib/types.js";

const API_BASE = "https://www.nslookup.io/api/v1/dns-health";

/** Maps protocol id → domain to query */
export const PROTOCOL_DOMAINS: Record<string, string> = {
  spark: "spark.fi",
  aave: "aave.com",
  morpho: "morpho.org",
  fluid: "instadapp.io",
  gearbox: "gearbox.fi",
  euler: "euler.finance",
  compound: "compound.finance",
  liquity: "liquity.org",
  uniswap: "uniswap.org",
  curve: "curve.fi",
  balancer: "balancer.fi",
  "cow-swap": "cow.fi",
  "1inch": "1inch.io",
  "0x-matcha": "matcha.xyz",
  yearn: "yearn.fi",
  mellow: "mellow.finance",
  "morpho-vaults": "morpho.org",
  pendle: "pendle.finance",
  lido: "lido.fi",
  "rocket-pool": "rocketpool.net",
};

interface NslookupCategory {
  name: string;
  score: number;
  checks: Array<{
    key: string;
    label: string;
    pass: boolean | null;
    value: unknown;
    severity: string;
  }>;
}

interface NslookupResponse {
  domain: string;
  score: number;
  checkedAt: string;
  categories: {
    dnssec: NslookupCategory;
    mx: NslookupCategory;
    hygiene: NslookupCategory;
    ttl: NslookupCategory;
    nsConfig: NslookupCategory;
    caa: NslookupCategory;
    operations: NslookupCategory;
  };
}

const nslookup: ProviderFetcher = {
  name: "NSLookup",
  slug: "nslookup",

  async fetch(): Promise<FetchReport> {
    const start = Date.now();
    const filesWritten: string[] = [];
    const errors: string[] = [];
    const index: Array<{
      protocolId: string;
      domain: string;
      score: number;
      dnssec: number;
      caa: number;
      ttl: number;
    }> = [];

    const entries = Object.entries(PROTOCOL_DOMAINS);
    console.log(`  [nslookup] Fetching DNS health for ${entries.length} domains...`);

    for (const [protocolId, domain] of entries) {
      try {
        console.log(`  [nslookup] ${protocolId} (${domain})...`);
        const data = await fetchJSON<NslookupResponse>(`${API_BASE}/${domain}`);

        const outPath = dataDir("nslookup", `${protocolId}.json`);
        await writeJSON(outPath, data);
        filesWritten.push(outPath);

        index.push({
          protocolId,
          domain,
          score: data.score,
          dnssec: data.categories.dnssec.score,
          caa: data.categories.caa.score,
          ttl: data.categories.ttl.score,
        });

        console.log(
          `  [nslookup] ${protocolId}: score=${data.score} dnssec=${data.categories.dnssec.score} caa=${data.categories.caa.score} ttl=${data.categories.ttl.score}`,
        );
      } catch (err) {
        errors.push(`${protocolId} (${domain}): ${err instanceof Error ? err.message : err}`);
        console.error(`  [nslookup] ERROR ${protocolId}: ${err instanceof Error ? err.message : err}`);
      }
    }

    // Write index
    const indexPath = dataDir("nslookup", "_index.json");
    await writeJSON(indexPath, { protocols: index, fetchedAt: new Date().toISOString() });
    filesWritten.push(indexPath);

    return {
      provider: "nslookup",
      filesWritten,
      errors,
      durationMs: Date.now() - start,
    };
  },
};

export default nslookup;

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/.*\//, ""))) {
  nslookup.fetch().then((r) => {
    console.log(`\nNSLookup: ${r.filesWritten.length} files, ${r.errors.length} errors, ${r.durationMs}ms`);
    if (r.errors.length) console.error("Errors:", r.errors);
  });
}
