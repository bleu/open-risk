import { fetchJSON } from "../lib/http.js";
import { writeJSON, dataDir } from "../lib/fs.js";
import type { ProviderFetcher, FetchReport } from "../lib/types.js";

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: unknown[];
}

async function fetchAllResults(
  baseUrl: string,
  path: string,
): Promise<{ results: unknown[]; count: number }> {
  const first = await fetchJSON<PaginatedResponse>(`${baseUrl}${path}`);
  const all = [...first.results];

  // Follow pagination (next URLs are absolute)
  let nextUrl = first.next;
  let safety = 50; // prevent infinite loops
  while (nextUrl && safety-- > 0) {
    // The API returns http:// URLs but the server is https
    const url = nextUrl.replace("http://", "https://");
    const page = await fetchJSON<PaginatedResponse>(url);
    all.push(...page.results);
    nextUrl = page.next;
  }

  return { results: all, count: first.count };
}

interface DashboardConfig {
  name: string;
  baseUrl: string;
  endpoints: { name: string; path: string; paginated: boolean }[];
}

const dashboards: DashboardConfig[] = [
  {
    name: "morpho",
    baseUrl: "https://morpho-api.blockanalitica.com",
    endpoints: [
      { name: "overall", path: "/overall/", paginated: false },
      { name: "markets", path: "/markets/", paginated: true },
      { name: "vaults", path: "/vaults/", paginated: true },
      { name: "liquidations", path: "/liquidations/", paginated: false },
      { name: "risk-capital-at-risk", path: "/risk/capital-at-risk/", paginated: false },
      { name: "chains", path: "/chains/", paginated: false },
      { name: "tokens", path: "/tokens/", paginated: true },
    ],
  },
  {
    // Spark API — endpoints were 404 during testing but attempting defensively
    name: "spark",
    baseUrl: "https://spark-api.blockanalitica.com",
    endpoints: [
      { name: "at-risk", path: "/at-risk/", paginated: false },
      { name: "stats", path: "/stats/", paginated: false },
      { name: "collateral", path: "/collateral/", paginated: false },
      { name: "liquidations", path: "/liquidations/", paginated: false },
    ],
  },
  {
    // Aave papi — endpoints were 404 during testing but attempting defensively
    name: "aave",
    baseUrl: "https://papi.blockanalitica.com",
    endpoints: [
      { name: "markets", path: "/markets/", paginated: false },
      { name: "at-risk-info", path: "/at-risk/info/", paginated: false },
      { name: "liquidations", path: "/liquidations/", paginated: false },
    ],
  },
];

const blockanalitica: ProviderFetcher = {
  name: "Block Analitica",
  slug: "blockanalitica",

  async fetch(): Promise<FetchReport> {
    const start = Date.now();
    const filesWritten: string[] = [];
    const errors: string[] = [];

    for (const dashboard of dashboards) {
      console.log(`  [blockanalitica] Fetching ${dashboard.name}...`);

      for (const ep of dashboard.endpoints) {
        const outPath = dataDir("blockanalitica", dashboard.name, `${ep.name}.json`);
        try {
          let data: unknown;
          if (ep.paginated) {
            const result = await fetchAllResults(dashboard.baseUrl, ep.path);
            data = {
              results: result.results,
              count: result.count,
              fetchedAt: new Date().toISOString(),
            };
          } else {
            data = await fetchJSON(`${dashboard.baseUrl}${ep.path}`);
          }
          await writeJSON(outPath, data);
          filesWritten.push(outPath);
          console.log(`    ${ep.name} -> OK`);
        } catch (err) {
          const msg = `${dashboard.name}/${ep.name}: ${err instanceof Error ? err.message : err}`;
          errors.push(msg);
          console.error(`    ${ep.name} -> FAILED: ${msg}`);
        }
      }
    }

    return {
      provider: "blockanalitica",
      filesWritten,
      errors,
      durationMs: Date.now() - start,
    };
  },
};

export default blockanalitica;

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/.*\//, ""))) {
  blockanalitica.fetch().then((r) => {
    console.log(`\nBlockAnalitica: ${r.filesWritten.length} files, ${r.errors.length} errors, ${r.durationMs}ms`);
    if (r.errors.length) console.error("Errors:", r.errors);
  });
}
