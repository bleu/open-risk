---
name: DeFi Saver
slug: defisaver
type: Dashboard
focus: "Live loan health and liquidation statistics for leveraged DeFi positions"
website: https://defisaver.com/
docs_url: https://docs.defisaver.com/
fetch_method: onchain
api_base: n/a
auth_required: false
data_format: onchain
source_repo: https://github.com/defisaver/defisaver-positions-sdk
access: free
metric_orientation: financial-market
recommendation: conditional
last_researched: 2026-06-05
confidence: high
---

# DeFi Saver

DeFi Saver is a non-custodial DeFi management application (built by Decenter) for creating, monitoring, and automating leveraged lending/borrowing positions across major Ethereum lending protocols. Its "Dashboard" and "DeFi Explore" surfaces show live loan health, liquidation price/buffer, and per-position and per-market statistics, with automation (auto-repay, stop-loss, leverage management) to protect positions from liquidation.

## Coverage of Top 20

DeFi Saver only covers protocols where a user holds (or could hold) a leveraged borrowing position, i.e. lending/CDP protocols. It has no concept of "coverage" for DEXs, aggregators, or staking tokens beyond using them as collateral.

- **Likely covered:** Spark, Aave (v3; Aave v4 "DeFi Explore" launched), Morpho (Morpho Blue), Fluid, Euler (Euler v2), Compound (v2 and v3), Liquity (v1 and v2). These are all directly supported lending/borrowing protocols in the app, and several are exposed in the read-only `defisaver-positions-sdk`.
- **Not applicable:**
  - Uniswap, Curve, Balancer (DEX/AMM) — DeFi Saver does not produce loan-health/liquidation data for AMM LPs (it integrates Curve/Balancer only as swap or flash-loan venues inside recipes, and CurveUSD/LlamaLend as a *lending* market).
  - CoW Swap, 1inch, 0x / Matcha (swap aggregators) — no leveraged positions to monitor; out of scope.
  - Yearn Finance, Mellow, Morpho Vaults, Pendle (yield/vaults) — DeFi Saver tracks borrowing positions, not vault deposits; Morpho is covered at the *Morpho Blue lending market* level, not the curated MetaMorpho vault (CuratorWatch territory).
  - Lido, Rocket Pool (liquid staking) — stETH/rETH appear only as collateral assets, not as protocols with a monitored position.
- **Gearbox** — not confirmed as a supported protocol in public surfaces; DeFi Saver's credit/leverage focus overlaps conceptually but no integration was found. Treat as unknown.
- **Notes:** Coverage derived from the app's "supported protocols" listing (Maker/Sky, Compound, Aave, Spark, Reflexer, Liquity, Curve/CurveUSD, LlamaLend, Morpho, Fluid, Euler v2) and the read-only `defisaver-positions-sdk` protocol list (Maker, Spark, CrvUSD, Aave V2, Aave V3, Compound V2, Compound V3, Liquity). Net: ~8 of the Top 20 are meaningfully covered; the other 12 are not applicable to a leverage-position monitor.

## Data products & meaning

### In-app Dashboard (per-protocol position view)
- **What it is:** A user-facing dashboard per supported protocol showing a connected wallet's positions: collateral, debt, health/liquidation ratio, liquidation price, and the safety buffer to liquidation.
- **What it means:** A real-time view of how close a leveraged position is to being liquidated, plus simulated outcomes of price moves.
- **Shape / fields:** Rendered HTML/JS (web app); underlying values are derived from on-chain protocol state. Not a documented machine-readable export.

### DeFi Explore (protocol-wide analytics)
- **What it is:** Public analytics dashboards (e.g. Aave v3 / Aave v4 DeFi Explore) tracking protocol-wide stats: total positions per chain, supply/borrow amounts, e-mode details, a live transaction feed, a "Price Slider" liquidation simulator, and (for Aave v4) liquidation tracking/analysis across the protocol.
- **What it means:** Aggregate market health and liquidation activity for a protocol across six chains (Ethereum, Arbitrum, Optimism, Base, Linea, Plasma) — useful for systemic liquidation/loan-health signal rather than a single position.
- **Shape / fields:** HTML/JS dashboard; no documented public API or export found.

### defisaver-positions-sdk (read-only, on-chain)
- **What it is:** An open-source TypeScript SDK that reads protocol market data and per-account positions directly via an RPC provider. Supports Maker, Spark, CrvUSD, Aave V2, Aave V3, Compound V2, Compound V3, Liquity.
- **What it means:** This is the closest thing to a programmatic feed: it returns market-level stats (`assetsData`, e.g. `getCompoundV3MarketsData()`) and account-level position/health metrics (`userData`, e.g. `getCompoundV3AccountData()`) computed from on-chain state — exactly the loan-health/liquidation data DeFi Saver's focus describes.
- **Shape / fields:** JS/TS objects (effectively JSON-shaped) with market assets data and per-user account data including collateral, debt, and health metrics. No auth; you bring your own RPC endpoint.

**Most relevant to import:** `defisaver-positions-sdk`. It is the only documented, machine-readable, auth-free way to obtain DeFi Saver-style loan-health/liquidation metrics, and it maps to several Top-20 lending protocols. The in-app dashboards and DeFi Explore have no documented public API, so they would require scraping. Note the SDK is essentially a re-implementation of standard on-chain reads — the data is DeFi Saver's *presentation* of protocol state, not a proprietary DeFi Saver rating.

## Metric alignment

- **Ethereum-principles signal:** Minimal. DeFi Saver does not assess decentralization, key/admin control, upgradeability, governance, or verifiability of the protocols it integrates.
- **Financial / market signal:** Dominant. It produces liquidation price/ratio, health factor/buffer, collateral and debt amounts, supply/borrow market stats, e-mode parameters, and liquidation activity — pure collateral-health / liquidation-risk and market-exposure data.

Orientation: **financial-market**. Specific metrics: per-position health factor / liquidation price / safety buffer, and protocol-wide supply/borrow/position counts and liquidation events. Within the registry this **overlaps heavily with BlockAnalitica** (quantitative on-chain lending-market risk: liquidations, collateral health, market exposure). DeFi Saver adds little methodological diversity on the analytics axis — its differentiator is per-user position tooling and automation, which is a *product* feature, not a feed signal. As a feed it is largely redundant with BlockAnalitica for the same lending protocols.

## Inclusion assessment

- **Verdict:** conditional
- **Reasoning:**
  - *Access:* Strongly positive — the app is free/non-custodial, DeFi Explore dashboards are public, and `defisaver-positions-sdk` is open-source (auth-free on-chain reads). Easily automatable in principle.
  - *Is it actually a risk feed?* Borderline. DeFi Saver is primarily a position-management/automation *product*, not a risk-rating or risk-research publisher. Its "feed" is computed on-chain loan-health/liquidation data — real risk signal, but not a distinct editorial assessment of a protocol. There is no per-protocol verbatim "rating" to surface in the aggregator's matrix the way DeFiScan or Credora provide one.
  - *Scope breadth:* Covers ~8 of the Top 20 (lending/CDP only); the majority of Top-20 are not applicable.
  - *Redundancy:* High overlap with BlockAnalitica (and partly with LlamaRisk) on liquidation/collateral-health metrics. Diversity value is low.
  - *Coverage relevance:* It does cover high-value Top-20 lending protocols (Aave, Spark, Compound, Liquity, Morpho Blue, Fluid, Euler), so it is not worthless.
  - *Neutrality:* DeFi Saver charges service/automation fees on the protocols it integrates (commercial relationship via fee revenue), which should be disclosed; it is not an independent rater.
  - **Net:** `conditional` — include only if the project wants a per-position/liquidation-simulation data source distinct from BlockAnalitica, and is willing to treat it as a computed metric feed (no verbatim protocol rating). Lean toward exclude if BlockAnalitica already satisfies the lending-market liquidation/collateral-health cell.

## How to fetch

- **Preferred (programmatic):** `defisaver-positions-sdk` (https://github.com/defisaver/defisaver-positions-sdk). TypeScript/npm. Instantiate with your own RPC provider (no DeFi Saver API key, no auth). Call market-data functions (e.g. `getCompoundV3MarketsData()`) and account-data functions (e.g. `getCompoundV3AccountData()`) for supported protocols (Maker, Spark, CrvUSD, Aave V2/V3, Compound V2/V3, Liquity). Returns JS/TS objects with market and per-account health metrics. Rate limits are governed by your RPC provider, not DeFi Saver. Verify exact function names/return shapes against the repo's README/source before building (live verification deferred).
- **Alternative (on-chain direct):** Read protocol state directly and replicate health/liquidation math (the SDK is effectively a convenience layer over standard on-chain reads). The `defisaver-v3-contracts` repo (MIT) documents the Actions/Triggers/Recipes architecture but is for transaction-building, not data reads.
- **Dashboards (no API):** The in-app per-protocol Dashboard and the public DeFi Explore analytics (Aave v3/v4) have no documented public REST/GraphQL API; obtaining their aggregated stats would require scraping the web app.
- **DefiLlama adapter:** DeFi Saver maintains a fork of `DefiLlama-Adapters`, indicating TVL/volume is reported to DefiLlama (useful for the RFP's DefiLlama-sourced TVL requirement, but that is DefiLlama data, not a DeFi Saver risk feed).

## Open questions / gaps

- Whether Gearbox is (or will be) a supported protocol — not confirmed.
- Whether `defisaver-positions-sdk` covers Spark/Morpho Blue/Fluid/Euler v2 read-side (the app supports them, but the public SDK protocol list enumerated only Maker, Spark, CrvUSD, Aave V2/V3, Compound V2/V3, Liquity). Needs repo source verification.
- Exact return-object schemas and field names for `assetsData`/`userData` per protocol — needs live inspection of the SDK source.
- Whether DeFi Explore exposes any undocumented JSON endpoint (XHR) that could be consumed instead of scraping — needs live network inspection (out of scope for documentation-only research).
- DeFi Saver is a non-Ethereum-only product (Arbitrum, Base, Optimism, Linea, Plasma); for v1 the aggregator would use only the Ethereum-mainnet reads.

## Sources

- https://defisaver.com/ — official site; non-custodial DeFi management, leverage and liquidation protection.
- https://defisaver.com/features/leverage-management — leverage management, liquidation price/buffer display, automation strategies.
- https://docs.defisaver.com/ — technical docs: Actions/Triggers/Recipes/Strategies architecture (transaction-building, not a data API).
- https://github.com/defisaver — org repo list (defisaver-positions-sdk, defisaver-v3-contracts [MIT], defisaver-tokens, automation-sdk, DefiLlama-Adapters fork).
- https://github.com/defisaver/defisaver-positions-sdk — read-only on-chain SDK; protocols Maker/Spark/CrvUSD/Aave V2/V3/Compound V2/V3/Liquity; returns assetsData + userData via your RPC; no auth.
- https://github.com/defisaver/defisaver-sdk — transaction-building SDK (not a read API).
- https://blog.defisaver.com/defi-saver-launches-aave-defi-explore/ — DeFi Explore for Aave v3 across 6 chains; market stats, live tx feed, Price Slider liquidation simulator; no API mentioned.
- https://blog.defisaver.com/defi-saver-launches-aave-v4-defi-explore/ — Aave v4 DeFi Explore adds liquidation tracking/analysis.
- https://help.defisaver.com/protocols/aave, /protocols/spark, /protocols/fluid/vault-protocol — supported-protocol knowledge base pages.
- https://help.defisaver.com/general/what-is-defi-saver/defi-saver-fees — fee structure (service fee on Boost/Repay/leverage; 0.05% automation fee), indicating commercial relationship with integrated protocols.
- https://oakresearch.io/en/reports/protocols/defi-saver-all-in-one-interface-for-defi-management — third-party overview; supported protocols, chains, volume.
