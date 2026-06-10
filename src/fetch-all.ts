import type { ProviderFetcher, FetchReport } from "./lib/types.js";
import { writeJSON, dataDir } from "./lib/fs.js";

import philidor from "./providers/philidor.js";
import defiscan from "./providers/defiscan.js";
import defipunkd from "./providers/defipunkd.js";
import blockanalitica from "./providers/blockanalitica.js";
import curatorwatch from "./providers/curatorwatch.js";
import nslookup from "./providers/nslookup.js";

const ALL_PROVIDERS: ProviderFetcher[] = [
  philidor,
  defiscan,
  defipunkd,
  blockanalitica,
  curatorwatch,
  nslookup,
];

function parseArgs(): { provider?: string; parallel: boolean } {
  const args = process.argv.slice(2);
  let provider: string | undefined;
  let parallel = false;

  for (const arg of args) {
    if (arg.startsWith("--provider=")) {
      provider = arg.split("=")[1];
    } else if (arg === "--parallel") {
      parallel = true;
    }
  }

  return { provider, parallel };
}

async function main() {
  const { provider, parallel } = parseArgs();

  let providers = ALL_PROVIDERS;
  if (provider) {
    const match = ALL_PROVIDERS.find((p) => p.slug === provider);
    if (!match) {
      console.error(
        `Unknown provider: ${provider}. Available: ${ALL_PROVIDERS.map((p) => p.slug).join(", ")}`,
      );
      process.exit(1);
    }
    providers = [match];
  }

  console.log(
    `Fetching ${providers.length} provider(s)${parallel ? " in parallel" : ""}...\n`,
  );

  let reports: FetchReport[];

  if (parallel) {
    reports = await Promise.all(providers.map((p) => p.fetch()));
  } else {
    reports = [];
    for (const p of providers) {
      console.log(`--- ${p.name} ---`);
      const report = await p.fetch();
      reports.push(report);
      console.log();
    }
  }

  // Print summary table
  console.log("=== Summary ===");
  console.log(
    "Provider".padEnd(20) +
      "Files".padEnd(8) +
      "Errors".padEnd(8) +
      "Duration",
  );
  console.log("-".repeat(50));

  for (const r of reports) {
    console.log(
      r.provider.padEnd(20) +
        String(r.filesWritten.length).padEnd(8) +
        String(r.errors.length).padEnd(8) +
        `${(r.durationMs / 1000).toFixed(1)}s`,
    );
  }

  const totalFiles = reports.reduce((s, r) => s + r.filesWritten.length, 0);
  const totalErrors = reports.reduce((s, r) => s + r.errors.length, 0);
  console.log("-".repeat(50));
  console.log(
    "TOTAL".padEnd(20) +
      String(totalFiles).padEnd(8) +
      String(totalErrors).padEnd(8),
  );

  // Write full report
  const reportPath = dataDir("_fetch-report.json");
  await writeJSON(reportPath, {
    fetchedAt: new Date().toISOString(),
    reports,
  });

  if (totalErrors > 0) {
    console.log(`\n${totalErrors} error(s) — see data/_fetch-report.json for details`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
