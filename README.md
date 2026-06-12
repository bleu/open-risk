# Open Risk

Proof-of-concept for the [Neutral DeFi Risk Intelligence Aggregator RFP](https://esp.ethereum.foundation/applicants/rfp/defi_risk_intel_agg) published by the Ethereum Foundation.

The RFP asks for an open-source web app that aggregates DeFi risk intelligence from every major feed into a single, neutral view. The key constraint is that it must display each provider's ratings verbatim — no composite scores, no independent risk opinions. Coverage must include the top 20 DeFi protocols by TVL on Ethereum mainnet, with live metrics.

This repo is a **proof of concept** to explore the idea. It is not licensed under AGPL-3.0 (as the RFP requires for the final deliverable) since it is only a prototype.

## Running locally

```bash
pnpm install
pnpm dev
```

The app runs at `http://localhost:3000`.

To refresh provider data snapshots:

```bash
pnpm fetch        # run all fetchers
pnpm fetch:defillama   # or run a specific one
```

## Data sources

The matrix displays data from multiple risk providers. Not all data is fetched live — here is the breakdown:

### Live (fetched on every page load)

| Data | Provider | Source |
|------|----------|--------|
| Protocol TVL | DeFiLlama | `api.llama.fi/protocols` |
| Token Market Cap | DeFiLlama | `stablecoins.llama.fi/stablecoins` |

### Automated fetchers (static snapshots)

These providers have scripts in `src/providers/` that pull data from real APIs. The fetched data is copied into `src/content/evaluations/` as TypeScript constants. Run `pnpm fetch` to refresh.

| Data | Provider |
|------|----------|
| TVL delta, hack history | DeFiLlama |
| DNS health scores | NSLookup |
| Protocol decentralization stages | DeFiScan |
| Control, autonomy, access & verifiability grades | DeFiPunk'd |
| Source verification & token safety | GoPlus |
| Multisig signer configuration | Safe Multisig |

### Manually collected (no automated fetcher yet)

These values were hand-collected from provider dashboards or APIs and hardcoded into `src/content/`. They may be stale.

| Data | Provider |
|------|----------|
| Risk scores | RiskLayer |
| Token security (verified, safe, fixed-supply, immutable) | GoPlus (tokens) |
| Token risk level | De.Fi Scanner |
| Rug pull safety scores | ChainAware |
| Stablecoin peg deviation | DeFiLlama (tokens) |
| Stablecoin safety grades & scores | Pharos |
| Oracle TVS delta | DeFiLlama (oracles) |
| Oracle accuracy & freshness | Chaos Labs |
| Oracle safety scores | DeFiSafety |
| Oracle alerts & risk level | Forta |

## Provider docs

The `docs/providers/` directory contains research notes for 25 risk data providers. Each doc covers:

- **Overview** — what the provider does and what kind of data it offers
- **Data availability** — whether data is accessible via API, scraping, or manual collection
- **Coverage** — how many of the top 20 protocols are covered
- **How to fetch** — API endpoints, auth requirements, and integration notes
- **Open questions** — unresolved issues or gaps

Providers are split between those suggested by the RFP (`is_rfp_suggestion: true` in frontmatter) and additional ones discovered during research. Each doc also notes whether we recommend including the provider in the final product and our confidence level in that assessment.
