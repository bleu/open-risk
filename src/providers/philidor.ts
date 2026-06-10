import { fetchJSON } from "../lib/http.js";
import { writeJSON, dataDir } from "../lib/fs.js";
import type { ProviderFetcher, FetchReport } from "../lib/types.js";

const BASE = "https://api.philidor.io/v1";

interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

async function fetchAllPages<T>(
  endpoint: string,
  limit = 100,
): Promise<{ data: T[]; total: number }> {
  const first = await fetchJSON<PaginatedResponse<T>>(
    `${BASE}${endpoint}?limit=${limit}&page=1`,
  );
  const all: T[] = [...first.data];

  if (first.meta.totalPages > 1) {
    const remaining = Array.from(
      { length: first.meta.totalPages - 1 },
      (_, i) => i + 2,
    );
    // fetch 3 pages at a time to be polite
    for (let i = 0; i < remaining.length; i += 3) {
      const batch = remaining.slice(i, i + 3);
      const results = await Promise.all(
        batch.map((page) =>
          fetchJSON<PaginatedResponse<T>>(
            `${BASE}${endpoint}?limit=${limit}&page=${page}`,
          ),
        ),
      );
      for (const r of results) all.push(...r.data);
    }
  }

  return { data: all, total: first.meta.total };
}

const philidor: ProviderFetcher = {
  name: "Philidor Analytics",
  slug: "philidor",

  async fetch(): Promise<FetchReport> {
    const start = Date.now();
    const filesWritten: string[] = [];
    const errors: string[] = [];

    const endpoints: { name: string; path: string; paginated: boolean }[] = [
      { name: "vaults", path: "/vaults", paginated: true },
      { name: "protocols", path: "/protocols", paginated: false },
      { name: "stats", path: "/stats", paginated: false },
      { name: "curators", path: "/curators", paginated: true },
      { name: "chains", path: "/chains", paginated: false },
    ];

    for (const ep of endpoints) {
      try {
        const outPath = dataDir("philidor", `${ep.name}.json`);
        if (ep.paginated) {
          const result = await fetchAllPages(ep.path);
          await writeJSON(outPath, {
            data: result.data,
            meta: { total: result.total, fetchedAt: new Date().toISOString() },
          });
        } else {
          const data = await fetchJSON(`${BASE}${ep.path}`);
          await writeJSON(outPath, data);
        }
        filesWritten.push(outPath);
        console.log(`  [philidor] ${ep.name} -> OK`);
      } catch (err) {
        const msg = `${ep.name}: ${err instanceof Error ? err.message : err}`;
        errors.push(msg);
        console.error(`  [philidor] ${ep.name} -> FAILED: ${msg}`);
      }
    }

    return {
      provider: "philidor",
      filesWritten,
      errors,
      durationMs: Date.now() - start,
    };
  },
};

export default philidor;

// Run standalone
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/.*\//, ""))) {
  philidor.fetch().then((r) => {
    console.log(`\nPhilidor: ${r.filesWritten.length} files, ${r.errors.length} errors, ${r.durationMs}ms`);
    if (r.errors.length) console.error("Errors:", r.errors);
  });
}
