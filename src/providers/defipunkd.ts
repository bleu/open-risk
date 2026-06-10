import { fetchGitHubRawJSON, fetchGitHubTree } from "../lib/github.js";
import { writeJSON, dataDir } from "../lib/fs.js";
import type { ProviderFetcher, FetchReport } from "../lib/types.js";

const OWNER = "guil-lambert";
const REPO = "defipunkd";
const BRANCH = "main";

const SLICES = ["control", "exit", "autonomy", "open-access", "verifiability"];

const defipunkd: ProviderFetcher = {
  name: "DeFiPunk'd",
  slug: "defipunkd",

  async fetch(): Promise<FetchReport> {
    const start = Date.now();
    const filesWritten: string[] = [];
    const errors: string[] = [];

    // Use tree API to discover which slugs have assessments
    console.log("  [defipunkd] Fetching repo tree...");
    let tree: Awaited<ReturnType<typeof fetchGitHubTree>>;
    try {
      tree = await fetchGitHubTree(OWNER, REPO, BRANCH);
    } catch (err) {
      errors.push(`tree: ${err instanceof Error ? err.message : err}`);
      return { provider: "defipunkd", filesWritten, errors, durationMs: Date.now() - start };
    }

    // Find all assessment slugs
    const assessmentFiles = tree.filter(
      (e) => e.path.startsWith("data/assessments/") && e.type === "blob",
    );
    const slugsWithAssessments = new Set<string>();
    for (const f of assessmentFiles) {
      const parts = f.path.split("/");
      // data/assessments/<slug>/<slice>.json
      if (parts.length >= 4 && parts[2] !== ".gitkeep") {
        slugsWithAssessments.add(parts[2]);
      }
    }

    // Find which slugs have overlays
    const overlayFiles = new Set(
      tree
        .filter((e) => e.path.startsWith("data/overlays/") && e.type === "blob")
        .map((e) => e.path.split("/")[2]?.replace(".json", "")),
    );

    const slugs = [...slugsWithAssessments].sort();
    console.log(`  [defipunkd] Found ${slugs.length} protocols with assessments`);

    const index: Array<{
      slug: string;
      slices: string[];
      hasOverlay: boolean;
    }> = [];

    for (const slug of slugs) {
      const entry: (typeof index)[number] = { slug, slices: [], hasOverlay: false };

      // Fetch assessment slices
      for (const slice of SLICES) {
        // Check if this file exists in tree before fetching
        const filePath = `data/assessments/${slug}/${slice}.json`;
        const exists = assessmentFiles.some((f) => f.path === filePath);
        if (!exists) continue;

        try {
          const data = await fetchGitHubRawJSON(OWNER, REPO, BRANCH, filePath);
          const outPath = dataDir("defipunkd", slug, `${slice}.json`);
          await writeJSON(outPath, data);
          filesWritten.push(outPath);
          entry.slices.push(slice);
        } catch (err) {
          if (!String(err).includes("404")) {
            errors.push(`${slug}/${slice}: ${err instanceof Error ? err.message : err}`);
          }
        }
      }

      // Fetch overlay if it exists
      if (overlayFiles.has(slug)) {
        try {
          const data = await fetchGitHubRawJSON(
            OWNER, REPO, BRANCH,
            `data/overlays/${slug}.json`,
          );
          const outPath = dataDir("defipunkd", slug, "overlay.json");
          await writeJSON(outPath, data);
          filesWritten.push(outPath);
          entry.hasOverlay = true;
        } catch (err) {
          if (!String(err).includes("404")) {
            errors.push(`${slug}/overlay: ${err instanceof Error ? err.message : err}`);
          }
        }
      }

      if (entry.slices.length > 0) {
        index.push(entry);
        console.log(`  [defipunkd] ${slug} -> ${entry.slices.join(", ")}${entry.hasOverlay ? " + overlay" : ""}`);
      }
    }

    // Write index
    const indexPath = dataDir("defipunkd", "_index.json");
    await writeJSON(indexPath, { protocols: index, fetchedAt: new Date().toISOString() });
    filesWritten.push(indexPath);

    return {
      provider: "defipunkd",
      filesWritten,
      errors,
      durationMs: Date.now() - start,
    };
  },
};

export default defipunkd;

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/.*\//, ""))) {
  defipunkd.fetch().then((r) => {
    console.log(`\nDeFiPunk'd: ${r.filesWritten.length} files, ${r.errors.length} errors, ${r.durationMs}ms`);
    if (r.errors.length) console.error("Errors:", r.errors);
  });
}
