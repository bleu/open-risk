import { fetchJSON } from "../lib/http.js";
import { writeJSON, dataDir } from "../lib/fs.js";
import type { ProviderFetcher, FetchReport } from "../lib/types.js";

const API_BASE = "https://api.gopluslabs.io/api/v1/token_security/1";

/** Maps protocol ID → Ethereum mainnet token contract address (null = no token) */
const TOKEN_ADDRESSES: Record<string, string | null> = {
  aave: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
  morpho: "0x9994E35Db50125E0DF82e4c2dde62496CE330999",
  fluid: "0x6f40d4A6237C257fff2dB00FA0510DeEECd303eb", // INST
  gearbox: "0xBa3335588D9403515223F109EdC4eB7269a9Ab5D", // GEAR
  euler: "0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b", // EUL
  compound: "0xc00e94Cb662C3520282E6f5717214004A7f26888", // COMP
  liquity: "0x6DEA81C8171D0bA574754EF6F8b412F2Ed88c54D", // LQTY
  uniswap: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // UNI
  curve: "0xD533a949740bb3306d119CC777fa900bA034cd52", // CRV
  balancer: "0xba100000625a3754423978a60c9317c58a424e3D", // BAL
  "cow-swap": "0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB", // COW
  "1inch": "0x111111111117dC0aa78b770fA6A738034120C302", // 1INCH
  "0x-matcha": "0xE41d2489571d322189246DaFA5ebDe1F4699F498", // ZRX
  yearn: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e", // YFI
  pendle: "0x808507121B80c02388fAd14726482e061B8da827", // PENDLE
  lido: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32", // LDO
  "rocket-pool": "0xD33526068D116cE69F19A9ee46F0bd304F21A51f", // RPL
  // No token: spark, mellow, morpho-vaults (duplicate of morpho)
};

interface GoPlusResult {
  is_open_source: string;
  is_proxy: string;
  is_honeypot: string;
  buy_tax: string;
  sell_tax: string;
  token_name: string;
  token_symbol: string;
  holder_count: string;
}

interface GoPlusResponse {
  code: number;
  message: string;
  result: Record<string, GoPlusResult>;
}

const goplus: ProviderFetcher = {
  name: "GoPlus",
  slug: "goplus",

  async fetch(): Promise<FetchReport> {
    const start = Date.now();
    const filesWritten: string[] = [];
    const errors: string[] = [];

    // Collect all non-null addresses
    const entries = Object.entries(TOKEN_ADDRESSES).filter(
      (e): e is [string, string] => e[1] != null,
    );

    console.log(
      `  [goplus] Fetching token security for ${entries.length} tokens...`,
    );

    const index: Array<{
      protocolId: string;
      tokenName: string;
      isOpenSource: boolean;
      isProxy: boolean;
      isHoneypot: boolean;
    }> = [];

    // Query each token individually with a delay to avoid rate limits
    for (let idx = 0; idx < entries.length; idx++) {
      const [protocolId, address] = entries[idx];
      // Rate limit: wait 6s between requests (GoPlus free tier is ~10 req/min)
      if (idx > 0)
        await new Promise((r) => setTimeout(r, 6000));
      let data: GoPlusResult | undefined;
      try {
        const url = `${API_BASE}?contract_addresses=${address}`;
        const response = await fetchJSON<GoPlusResponse>(url);
        if (response.code !== 1) {
          errors.push(`${protocolId}: API error: ${response.message}`);
          continue;
        }
        data = response.result?.[address.toLowerCase()];
      } catch (err) {
        errors.push(`${protocolId}: ${err instanceof Error ? err.message : err}`);
        continue;
      }
      if (!data) {
        errors.push(`${protocolId}: no data for ${address}`);
        continue;
      }

      const entry = {
        protocolId,
        address,
        tokenName: data.token_name,
        tokenSymbol: data.token_symbol,
        isOpenSource: data.is_open_source === "1",
        isProxy: data.is_proxy === "1",
        isHoneypot: data.is_honeypot === "1",
        buyTax: data.buy_tax,
        sellTax: data.sell_tax,
        holderCount: data.holder_count,
      };

      const outPath = dataDir("goplus", `${protocolId}.json`);
      await writeJSON(outPath, entry);
      filesWritten.push(outPath);

      index.push({
        protocolId,
        tokenName: entry.tokenName,
        isOpenSource: entry.isOpenSource,
        isProxy: entry.isProxy,
        isHoneypot: entry.isHoneypot,
      });

      console.log(
        `  [goplus] ${protocolId} (${data.token_symbol}): src=${data.is_open_source} proxy=${data.is_proxy} honeypot=${data.is_honeypot}`,
      );
    }

    // Write index
    const indexPath = dataDir("goplus", "_index.json");
    await writeJSON(indexPath, {
      protocols: index,
      fetchedAt: new Date().toISOString(),
    });
    filesWritten.push(indexPath);

    return {
      provider: "goplus",
      filesWritten,
      errors,
      durationMs: Date.now() - start,
    };
  },
};

export default goplus;

if (
  process.argv[1] &&
  import.meta.url.endsWith(process.argv[1].replace(/.*\//, ""))
) {
  goplus.fetch().then((r) => {
    console.log(
      `\nGoPlus: ${r.filesWritten.length} files, ${r.errors.length} errors, ${r.durationMs}ms`,
    );
    if (r.errors.length) console.error("Errors:", r.errors);
  });
}
