---
name: Zyfai Risk
slug: zyfai
type: Dashboard
focus: "Real-time risk score dashboard for DeFi liquidity pools. Tracks risk metrics, TVL, APY, and security grades across pools."
website: https://risk.zyf.ai/
docs_url: https://docs.zyf.ai/
fetch_method: api
api_base: https://api.zyf.ai/api/v1 | https://defiapi.zyf.ai/api/v2
auth_required: yes (SDK API key via x-sdk-key header)
data_format: json
source_repo: https://github.com/ondefy/zyfai-sdk
access: free (API key required)
metric_orientation: financial-market
recommendation: include
last_researched: 2026-06-08
confidence: high
---

# Zyfai Risk

Zyfai Risk (risk.zyf.ai) is a free, browser-based risk-score dashboard for DeFi
liquidity pools, operated by Zyfai — an automated, non-custodial cross-chain
**yield agent** that rebalances user funds across lending/yield protocols. The
dashboard exists primarily to surface the pools Zyfai's own quant team assesses
and rebalances into; it grades pools (reportedly A–F) on risk while showing TVL,
APY, and a security/audit signal.

## Coverage of Top 20

Zyfai's universe spans multiple chains including **Ethereum mainnet**, Base,
Arbitrum, Sonic, and Plasma. Its integrated protocols are lending/yield venues
with risk scoring across pools on each supported chain.

The risk dashboard covers a large pool index across many chains, including
Ethereum mainnet pools for several Top-20 protocols.

- **Covered on Ethereum mainnet:** Aave, Compound V3, Fluid, Morpho Vaults,
  Spark, Yearn — these protocols have confirmed mainnet pool coverage with risk
  scores on the risk.zyf.ai dashboard.
- **Also covered on Ethereum mainnet (confirmed via API):** Dolomite, Euler,
  Superform, Wasabi Protocol — present in the API's aggressive opportunity set.
- **Covered on L2/alt-L1 only:** Harvest, Moonwell, Silo, Ipor — these
  appear in Zyfai's integration list on non-mainnet chains.
- **Not applicable:** Uniswap, Curve, Balancer, CoW Swap, 1inch, 0x/Matcha,
  Lido, Rocket Pool, Pendle, Mellow, Liquity, Gearbox — Zyfai is a
  lending/stablecoin-yield agent (USDC/WETH deposit assets); DEX/AMM, swap
  aggregators, liquid staking, and yield-tokenization protocols fall outside its
  pool universe.
- **Notes:** Mainnet coverage confirmed via the risk.zyf.ai dashboard and
  verified via the SDK API (80 mainnet pools across 9 protocols). The SDK
  (`@zyfai/sdk`) provides programmatic access to pool-level data including
  risk-stability signals.

## Data products & meaning

### Pool risk dashboard (risk.zyf.ai)
- **What it is:** A real-time table of DeFi liquidity pools, each with a risk
  score/grade, TVL, APY (reported as a 30-day mean with a prediction direction),
  and a security/audit signal. Used by Zyfai's quant team to assess and monitor
  rebalancing opportunities daily.
- **What it means:** A composite, opinionated risk grade per pool intended to
  rank yield opportunities by risk-adjusted attractiveness — i.e. "is this pool
  safe enough to allocate into." Drivers cited include TVL/liquidity, interest-
  rate model (IRM), collateral quality, and whether the market is permissionless.
- **Shape / fields:** Per-pool: protocol, chain, asset/pair, risk grade (A–F per
  secondary sources), TVL, APY (30d mean + direction), security/audit proxy.
  Rendered as HTML in a single-page app; no documented machine-readable export.

### Zyfai SDK / Data API (github.com/ondefy/zyfai-sdk)
- **What it is:** A TypeScript SDK (`@zyfai/sdk`) over two JSON API backends:
  - Execution API (`https://api.zyf.ai/api/v1`): protocols, pools, TVL, volume,
    positions, transaction history.
  - Data API (`https://defiapi.zyf.ai/api/v2`): opportunities with risk-stability
    metrics, APY history, earnings.
- **What it means:** The opportunities endpoints expose per-pool risk-relevant
  data that goes well beyond raw yield. Each pool entry includes stability flags,
  collateral health, utilization, interest-rate model parameters, vault
  allocations with per-market exposure, and top depositor positions.
- **Auth:** SDK API key via `x-sdk-key` header. Keys are obtained from the Zyfai
  dashboard and prefixed `zyfai_`.
- **Shape / fields per pool:**
  - `tvlUsd`, `liquidityUsd` — pool size and available liquidity
  - `combined_apy`, `pool_apy`, `rewards_apy` — yield decomposition
  - `averageCombinedApy7Days/15Days/30Days` — historical APY averages
  - `isTvlStable`, `isApyStable7Days/10Days/15Days/30Days` — stability flags
  - `isApyTvlStable` — combined APY+TVL stability
  - `isUtilizationStable` — utilization stability
  - `collateralHealth.isHealthy` — collateral health assessment
  - `collateral_symbols`, `collateral_tokens` — underlying collateral
  - `interestratestrategy` — IRM parameters (baseRate, kinks, utilization,
    totalBorrow, totalSupply, maxMarketUtilization)
  - `vault_allocations` — per-market: APY, collateral exposure, utilization %
  - `top_positions` — top depositor addresses and USD amounts
  - `strategy_type` — conservative (`safe`) vs aggressive (`degen`)
  - `status` — `live` or `not_live`
- **Chains:** Ethereum (1), Base (8453), Arbitrum (42161), Sonic (146),
  Plasma (9745). Verified: 9 protocols and 80 pools on Ethereum mainnet alone.

**Most relevant to import:** The SDK Data API opportunities endpoints are the
primary candidate feed. They provide structured JSON with per-pool risk-stability
signals for Ethereum mainnet pools across Aave V3, Compound V3, Dolomite, Euler,
Fluid, Morpho, Spark, Superform, Wasabi, and Yearn. The A–F letter grades from
risk.zyf.ai are **not** exposed via the API; however, the underlying stability
and health metrics that likely drive those grades are available.

## Metric alignment

- **Ethereum-principles signal:** Essentially none. No decentralization/key-
  control/upgradeability/governance/exit-window scoring. The closest is a
  "permissionless market" input, but that is one factor inside a yield-risk
  composite, not a trustlessness assessment.
- **Financial / market signal:** Dominant. TVL, APY (level + sustainability +
  predicted direction), liquidity, IRM, collateral quality, and an audit/security
  proxy — all oriented to risk-adjusted yield selection.

Orientation: **financial-market**. Specific metrics: pool risk grade, TVL, 30d
mean APY + direction, security/audit proxy, IRM and collateral inputs. In the
registry this **duplicates** existing financial/market dashboards
(BlockAnalitica's lending risk, pigi.finance's risk-adjusted yield, Xerberus/
Philidor vault scoring) without adding a distinct method or Ethereum-principles
signal. It is also a composite letter-grade product, which sits awkwardly with
the RFP's no-composite-scoring deliverable (though that constraint binds the
aggregator, not the feeds it shows verbatim).

## Inclusion assessment

- **Verdict:** include
- **Reasoning:**
  - *API access:* The Zyfai SDK (`@zyfai/sdk`, open-source on GitHub) exposes
    structured JSON endpoints with per-pool risk-stability metrics. Auth is via
    an SDK API key (`x-sdk-key` header). The opportunities endpoints return TVL,
    APY, stability flags (7/10/15/30d), collateral health, IRM parameters, vault
    allocations, and utilization data. This is a viable, automatable feed-
    ingestion path.
  - *Ethereum mainnet coverage:* The API confirms 9 protocols and 80 pools on
    Ethereum mainnet, covering Aave V3, Compound V3, Dolomite, Euler, Fluid,
    Morpho (42 vaults), Spark, Superform, Wasabi, and Yearn.
  - *Neutrality caveat (not blocking):* Zyfai is a yield agent whose risk data
    originates from its internal opportunity-screening process. The grades are
    coupled to protocols Zyfai integrates with (advisor Marc Zeller is Aave-
    affiliated). This is a known bias — the aggregator should surface it
    alongside the data, not treat it as a disqualifier.
  - *Unique value:* Per-pool stability signals (TVL stability, APY stability at
    multiple timeframes, utilization stability, collateral health) are a
    differentiated signal axis not duplicated by other providers. Vault
    allocation breakdowns with per-market exposure and utilization add depth.

## How to fetch

Fetch via the Zyfai SDK Data API. Verified with live API calls.

- **SDK:** `@zyfai/sdk` (TypeScript, open-source:
  https://github.com/ondefy/zyfai-sdk). Can also call the HTTP endpoints
  directly.
- **Auth:** SDK API key via `x-sdk-key` header. Keys prefixed `zyfai_`, obtained
  from the Zyfai dashboard.
- **Key endpoints:**
  - `GET https://api.zyf.ai/api/v1/protocols?chainId=1` — list all protocols on
    Ethereum mainnet with supported assets and strategies.
  - `GET https://defiapi.zyf.ai/api/v2/opportunities/safe?chainId=1` — all
    conservative (safe) pools on mainnet with risk-stability metrics.
  - `GET https://defiapi.zyf.ai/api/v2/opportunities/degen-strategies?chainId=1`
    — all aggressive (degen) pools on mainnet with risk-stability metrics.
  - `GET https://api.zyf.ai/api/v1/customization/pools?protocolId={id}` — list
    available pools for a specific protocol.
  - `GET https://api.zyf.ai/api/v1/data/usd-tvl` — total TVL across Zyfai.
- **Format:** JSON. Responses include per-pool objects with all stability flags,
  APY averages, collateral health, IRM parameters, and vault allocations.
- **Rate limits:** Not publicly documented. No issues observed during testing.
- **Risk dashboard (risk.zyf.ai):** The A–F letter grades are only available on
  the SPA and are not exposed via the API. The underlying stability and health
  metrics are available through the SDK endpoints above.

## Open questions / gaps

- ~~Does risk.zyf.ai score Ethereum mainnet pools?~~ **Resolved:** Yes —
  confirmed mainnet coverage for 9 protocols and 80 pools via the SDK API.
- ~~Is there an API behind the dashboard?~~ **Resolved:** The SDK exposes two
  JSON API backends (Execution API and Data API) with risk-stability metrics per
  pool. The A–F letter grades are not available via the API, but the underlying
  signals are.
- Is the A–F grade scale confirmed by Zyfai's own docs, or only by secondary
  write-ups? The exact grade scale and methodology were not found on a primary
  Zyfai page.
- Are there disclosed commercial relationships between Zyfai and the listed
  protocols it integrates (advisor Marc Zeller is Aave-affiliated)? This is a
  neutrality caveat to surface alongside the data.
- Rate limits and terms of use for the SDK API key are not publicly documented.

## Sources

- https://risk.zyf.ai/ — the risk dashboard itself (JS SPA; title confirms "Pool
  Risk Scores & Analytics"; full content not server-rendered).
- https://www.zyf.ai/transparency — Zyfai positions risk.zyf.ai as its quant
  team's daily opportunity-assessment tool (TVL, liquidity, IRM, collateral
  quality, permissionless inputs).
- https://github.com/ondefy/zyfai-sdk — open-source TypeScript SDK. Confirms
  API base URLs, endpoint schemas, and supported chains/protocols.
- https://docs.zyf.ai/docs/sdk/getting-started — SDK/API docs: chains
  Arbitrum/Base/Plasma, USDC/WETH assets, Data API `/api/v2` (opportunities,
  earnings, APY history).
- https://docs.zyf.ai/f.a.q — FAQ (non-custodial model; users rely on integrated
  protocols' contract security; Zyfai holds no vault contracts).
- https://iq.wiki/wiki/zyfai — profile: chains Base/Sonic/Arbitrum/Plasma;
  integrated protocols (Aave, Compound v3, Euler, Fluid, Harvest, Moonwell,
  Morpho, Silo, Spark, Wasabi); backers/advisors incl. Marc Zeller; ~$8.5M TVL
  (Nov 2025). Note: IQ.wiki profile does not list Ethereum mainnet, but mainnet
  coverage is confirmed via the SDK API.
- Live API testing (2026-06-08) — verified Ethereum mainnet coverage: 9
  protocols, 80 pools (29 conservative + 51 aggressive). Confirmed risk-stability
  fields (TVL/APY stability flags, collateral health, IRM, vault allocations)
  returned per pool. Sample data stored in `data/` directory.
</content>
</invoke>
