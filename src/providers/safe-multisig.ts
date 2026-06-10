import { fetchJSON } from "../lib/http.js";
import { writeJSON, dataDir } from "../lib/fs.js";
import type { ProviderFetcher, FetchReport } from "../lib/types.js";

const API_BASE = "https://safe-transaction-mainnet.safe.global/api/v1/safes";

/**
 * Maps protocol ID → known Gnosis Safe multisig address on Ethereum mainnet.
 * Sourced from DeFiPunk'd control assessments and protocol documentation.
 *
 * The Safe Transaction Service API is free (2 RPS unauthenticated).
 * Set to null for protocols without a known Safe or using non-Safe governance.
 */
const SAFE_ADDRESSES: Record<string, string | null> = {
  spark: "0x44efFc473e81632B12486866AA1678edbb7BEeC3", // Freezer multisig
  aave: "0xCe52ab41C40575B072A18C9700091Ccbe4A06710", // Governance Guardian (5-of-9)
  morpho: "0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa", // DAO governance multisig
  fluid: null,
  gearbox: null,
  euler: null,
  compound: null,
  liquity: null, // Fully immutable — no admin keys
  uniswap: null, // Governor Bravo + timelock, no Safe
  curve: "0x467947EE34aF926cF1DCac093870f613C96B1E0c", // Emergency DAO (5-of-9)
  balancer: null, // Emergency SubDAO address not a Safe on mainnet
  "cow-swap": null,
  "1inch": null,
  "0x-matcha": null,
  yearn: null,
  mellow: null,
  "morpho-vaults": null,
  pendle: "0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1", // V2 governance (3-of-5)
  lido: "0x8772E3a2D86B9347A2688f9bc1808A6d8917760C", // GateSeal Committee (3-of-6)
  "rocket-pool": null, // oDAO/pDAO governance, no Safe
};

interface SafeResponse {
  address: string;
  owners: string[];
  threshold: number;
  nonce: number;
  version: string;
  modules: string[];
}

const safeMultisig: ProviderFetcher = {
  name: "Safe Multisig",
  slug: "safe-multisig",

  async fetch(): Promise<FetchReport> {
    const start = Date.now();
    const filesWritten: string[] = [];
    const errors: string[] = [];

    const entries = Object.entries(SAFE_ADDRESSES).filter(
      (e): e is [string, string] => e[1] != null,
    );

    if (entries.length === 0) {
      console.log(
        "  [safe-multisig] No Safe addresses configured — skipping.",
      );
      return {
        provider: "safe-multisig",
        filesWritten,
        errors,
        durationMs: Date.now() - start,
      };
    }

    console.log(
      `  [safe-multisig] Fetching multisig config for ${entries.length} addresses...`,
    );

    const index: Array<{
      protocolId: string;
      threshold: number;
      owners: number;
      display: string;
    }> = [];

    for (const [protocolId, address] of entries) {
      try {
        console.log(`  [safe-multisig] ${protocolId} (${address})...`);
        const data = await fetchJSON<SafeResponse>(
          `${API_BASE}/${address}/`,
        );

        const entry = {
          protocolId,
          address: data.address,
          threshold: data.threshold,
          owners: data.owners.length,
          ownerAddresses: data.owners,
          display: `${data.threshold}/${data.owners.length}`,
          version: data.version,
        };

        const outPath = dataDir("safe-multisig", `${protocolId}.json`);
        await writeJSON(outPath, entry);
        filesWritten.push(outPath);

        index.push({
          protocolId,
          threshold: entry.threshold,
          owners: entry.owners,
          display: entry.display,
        });

        console.log(
          `  [safe-multisig] ${protocolId}: ${entry.display} signers`,
        );
      } catch (err) {
        errors.push(
          `${protocolId}: ${err instanceof Error ? err.message : err}`,
        );
        console.error(
          `  [safe-multisig] ERROR ${protocolId}: ${err instanceof Error ? err.message : err}`,
        );
      }
    }

    // Write index
    const indexPath = dataDir("safe-multisig", "_index.json");
    await writeJSON(indexPath, {
      protocols: index,
      fetchedAt: new Date().toISOString(),
    });
    filesWritten.push(indexPath);

    return {
      provider: "safe-multisig",
      filesWritten,
      errors,
      durationMs: Date.now() - start,
    };
  },
};

export default safeMultisig;

if (
  process.argv[1] &&
  import.meta.url.endsWith(process.argv[1].replace(/.*\//, ""))
) {
  safeMultisig.fetch().then((r) => {
    console.log(
      `\nSafe Multisig: ${r.filesWritten.length} files, ${r.errors.length} errors, ${r.durationMs}ms`,
    );
    if (r.errors.length) console.error("Errors:", r.errors);
  });
}
