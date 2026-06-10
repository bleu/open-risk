import matter from "gray-matter";
import { fetchGitHubRaw, fetchGitHubRawJSON, listDirectories } from "../lib/github.js";
import { writeJSON, dataDir } from "../lib/fs.js";
import type { ProviderFetcher, FetchReport } from "../lib/types.js";

const OWNER = "deficollective";
const REPO = "defiscan";
const BRANCH = "main";
const PROTOCOLS_PREFIX = "src/content/protocols/";

const CHAINS = ["ethereum", "arbitrum", "base", "optimism", "polygon", "gnosis"];

const defiscan: ProviderFetcher = {
  name: "DeFiScan",
  slug: "defiscan",

  async fetch(): Promise<FetchReport> {
    const start = Date.now();
    const filesWritten: string[] = [];
    const errors: string[] = [];
    const index: Array<{
      slug: string;
      stage?: number;
      risks?: string[];
      chains: string[];
    }> = [];

    // Discover all protocol slugs from the repo tree
    console.log("  [defiscan] Discovering protocol slugs...");
    let slugs: string[];
    try {
      slugs = await listDirectories(OWNER, REPO, BRANCH, PROTOCOLS_PREFIX);
      // Filter out template directories
      slugs = slugs.filter((s) => !s.startsWith("_"));
      console.log(`  [defiscan] Found ${slugs.length} protocols`);
    } catch (err) {
      errors.push(`tree discovery: ${err instanceof Error ? err.message : err}`);
      return { provider: "defiscan", filesWritten, errors, durationMs: Date.now() - start };
    }

    for (const slug of slugs) {
      const entry: (typeof index)[number] = { slug, chains: [] };

      // Fetch data.json
      try {
        const data = await fetchGitHubRawJSON(
          OWNER, REPO, BRANCH,
          `${PROTOCOLS_PREFIX}${slug}/data.json`,
        );
        const outPath = dataDir("defiscan", slug, "data.json");
        await writeJSON(outPath, data);
        filesWritten.push(outPath);
      } catch (err) {
        if (String(err).includes("404")) {
          // No data.json for this slug, skip silently
        } else {
          errors.push(`${slug}/data.json: ${err instanceof Error ? err.message : err}`);
        }
      }

      // Fetch chain .md files and parse frontmatter
      for (const chain of CHAINS) {
        try {
          const md = await fetchGitHubRaw(
            OWNER, REPO, BRANCH,
            `${PROTOCOLS_PREFIX}${slug}/${chain}.md`,
          );
          const { data: frontmatter } = matter(md);
          const outPath = dataDir("defiscan", slug, `${chain}.json`);
          await writeJSON(outPath, frontmatter);
          filesWritten.push(outPath);
          entry.chains.push(chain);
          if (chain === "ethereum") {
            entry.stage = frontmatter.stage;
            entry.risks = frontmatter.risks;
          }
        } catch (err) {
          if (String(err).includes("404")) {
            // Chain file doesn't exist for this protocol, expected
          } else {
            errors.push(`${slug}/${chain}.md: ${err instanceof Error ? err.message : err}`);
          }
        }
      }

      if (entry.chains.length > 0) {
        index.push(entry);
        console.log(`  [defiscan] ${slug} -> ${entry.chains.join(", ")}`);
      }
    }

    // Write index
    const indexPath = dataDir("defiscan", "_index.json");
    await writeJSON(indexPath, { protocols: index, fetchedAt: new Date().toISOString() });
    filesWritten.push(indexPath);

    return {
      provider: "defiscan",
      filesWritten,
      errors,
      durationMs: Date.now() - start,
    };
  },
};

export default defiscan;

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/.*\//, ""))) {
  defiscan.fetch().then((r) => {
    console.log(`\nDeFiScan: ${r.filesWritten.length} files, ${r.errors.length} errors, ${r.durationMs}ms`);
    if (r.errors.length) console.error("Errors:", r.errors);
  });
}
