import { fetchText } from "../lib/http.js";
import { writeJSON, dataDir } from "../lib/fs.js";
import type { ProviderFetcher, FetchReport } from "../lib/types.js";

const curatorwatch: ProviderFetcher = {
  name: "CuratorWatch",
  slug: "curatorwatch",

  async fetch(): Promise<FetchReport> {
    const start = Date.now();
    const filesWritten: string[] = [];
    const errors: string[] = [];
    const attempted: string[] = [];

    // Best-effort: try to find embedded JSON in the HTML
    let extractedData: unknown = null;

    try {
      const html = await fetchText("https://curatorwatch.com/", { timeoutMs: 15_000 });
      attempted.push("https://curatorwatch.com/ — fetched HTML");

      // Look for __NEXT_DATA__ (unlikely but worth checking)
      const nextDataMatch = html.match(
        /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/,
      );
      if (nextDataMatch) {
        extractedData = JSON.parse(nextDataMatch[1]);
        attempted.push("Found __NEXT_DATA__ — extracted");
      }

      // Look for any JSON in self.__next_f.push() calls
      if (!extractedData) {
        const pushMatches = html.match(/self\.__next_f\.push\(\[.*?\]\)/g);
        if (pushMatches && pushMatches.length > 0) {
          attempted.push(
            `Found ${pushMatches.length} RSC stream chunks — not parseable as structured data`,
          );
        } else {
          attempted.push("No __NEXT_DATA__ or RSC stream chunks found in initial HTML");
        }
      }
    } catch (err) {
      attempted.push(
        `https://curatorwatch.com/ — failed: ${err instanceof Error ? err.message : err}`,
      );
    }

    // Try /api/ endpoint
    try {
      await fetchText("https://curatorwatch.com/api/", { timeoutMs: 10_000 });
      attempted.push("https://curatorwatch.com/api/ — responded");
    } catch (err) {
      attempted.push(
        `https://curatorwatch.com/api/ — ${err instanceof Error ? err.message : err}`,
      );
    }

    // Write status file
    const status = {
      status: extractedData ? "partial" : "deferred",
      reason:
        "No public API or machine-readable data surface. Data is rendered via React Server Components. Browser automation (Playwright) would be required for full extraction.",
      checkedAt: new Date().toISOString(),
      attempted,
      ...(extractedData ? { data: extractedData } : {}),
    };

    const outPath = dataDir("curatorwatch", "_status.json");
    await writeJSON(outPath, status);
    filesWritten.push(outPath);

    if (!extractedData) {
      errors.push("No machine-readable data surface found — deferred");
    }

    console.log(
      `  [curatorwatch] ${extractedData ? "Partial data extracted" : "Deferred — no API available"}`,
    );

    return {
      provider: "curatorwatch",
      filesWritten,
      errors,
      durationMs: Date.now() - start,
    };
  },
};

export default curatorwatch;

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/.*\//, ""))) {
  curatorwatch.fetch().then((r) => {
    console.log(`\nCuratorWatch: ${r.filesWritten.length} files, ${r.errors.length} errors, ${r.durationMs}ms`);
    if (r.errors.length) console.error("Errors:", r.errors);
  });
}
