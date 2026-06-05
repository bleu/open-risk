---
name: DeFi Sphere
slug: defisphere
type: Rating
focus: "Multi-dimensional protocol analysis covering technical, financial, and operational risk"
website: https://defi-sphere.com
docs_url: https://docs.blockanalitica.com/agent-sphere/
fetch_method: scrape
api_base: n/a
auth_required: unknown
data_format: html
source_repo: n/a
access: free
metric_orientation: financial-market
recommendation: conditional
last_researched: 2026-06-05
confidence: medium
---

# DeFi Sphere

DeFi Sphere ("Sphere") is a DeFi lending analytics dashboard built and operated by **Block Analitica** (https://app.defi-sphere.com/ is titled "Sphere by Block Analitica"). It provides real-time lending rates, liquidity, and per-pool **risk scores** across major Ethereum lending protocols, plus an AI layer ("Agent Sphere") that summarizes the dashboard data.

> Note: The RFP §4 describes DeFi Sphere as a "Rating" provider doing "multi-dimensional protocol analysis covering technical, financial, and operational risk." The publicly observable product is narrower than that one-liner: it is a lending-market analytics dashboard with two financial/market risk-score dimensions (market risk, liquidity risk), not a technical/operational protocol-rating framework. This discrepancy is flagged in Open Questions.

## Coverage of Top 20

Sphere covers Ethereum lending markets only. Its documentation/marketing lists protocols across two surfaces; combining them:

- **Likely covered:** Aave, Compound, Morpho, Spark, Fluid, Liquity (per docs corpus: "Sky, Spark, Aave, Morpho, Compound, Fluid, Liquity"; the landing app lists "Aave, Compound V3, Morpho, SparkLend, Liquity V2"). Spark = the Sky sub-protocol seed entry; Liquity V2 is explicitly named. **Morpho Vaults** are likely partially covered insofar as Morpho lending pools are tracked, but curated MetaMorpho vaults are not the stated focus.
- **Not applicable:**
  - Uniswap, Curve, Balancer, CoW Swap, 1inch, 0x / Matcha — DEX/AMM and swap aggregators; Sphere only covers lending markets (rates, LTV, liquidations).
  - Lido, Rocket Pool — liquid staking; stETH/rETH appear only as collateral assets, not as rated protocols.
  - Yearn Finance, Mellow, Pendle — yield/vault protocols outside the lending-rate scope.
  - Gearbox, Euler — lending protocols but NOT listed in either Sphere protocol list found; treat as not-covered rather than N/A.
- **Notes:** Coverage determined from the defi-sphere.com landing page protocol list and the Block Analitica `llms-full.txt` docs corpus. The two sources disagree slightly (landing page shows 5 protocols incl. Compound V3 and SparkLend; docs corpus shows 7 incl. Sky and Fluid). Sphere is rate/pool-oriented, so coverage is best read as "lending markets within these protocols," not whole-protocol governance ratings. Gearbox/Euler coverage is unconfirmed.

## Data products & meaning

### Sphere lending dashboard (rates, markets, liquidations)
- **What it is:** A real-time rate explorer and analytics dashboard for onchain lending markets — borrow/supply/funding rates, stablecoin supply, utilization, LTVs, max leverage, and liquidation tracking across the covered protocols. Advertises "4K+ data series" and a custom "Sandbox" chart builder mixing DeFi, TradFi, and macro metrics.
- **What it means:** Lets borrowers/lenders compare rates and monitor market/liquidity conditions per pool; it is descriptive market data, not a trust/decentralization rating.
- **Shape / fields:** Per-pool rows: borrow rate, supply rate, utilization (with moving averages), LTV, max leverage, collateral composition, supplier/borrower concentration (HHI), collateral at risk. Presented as tables, scatter plots, and radar charts in the web app (HTML/JS).

### Sphere Risk Scores
- **What it is:** A per-pool risk scoring system. v1 covers two dimensions: **Market Risk Score** and **Liquidity Risk Score**. Oracle risk and settlement-process evaluations are stated as in development.
- **What it means:**
  - *Market Risk Score:* "the relative risk of undercollateralization caused by a sudden price shock," factoring onchain liquidity, liquidation bonuses, and individual borrower LTV. Higher = riskier.
  - *Liquidity Risk Score:* pool liquidity quality via supplier/borrower concentration, average utilization, and relative pool size. Higher = riskier.
- **Shape / fields:** Per-pool scores on "a unified indexed scale," shown in radar charts (favorable = nearer perimeter), scatter plots (yield vs. risk quadrants), and a six-metric table. Covers "all major stablecoins on mainnet." Granularity is per-pool, not per-protocol.

### Agent Sphere (AI layer)
- **What it is:** "The first AI analyst for stablecoins, liquidity, and risk in DeFi" — an LLM pipeline over the Sphere dashboard producing market notes, opportunity highlights, and delta summaries.
- **What it means:** Derived/synthesized commentary, not a primary feed; less suitable for verbatim, machine-readable aggregation.
- **Shape / fields:** Natural-language summaries. Docs expose a documentation-query helper (`GET .../readme.md?ask=<question>`), which is a docs Q&A mechanism, not a data API.

**Most relevant to import:** The **Sphere Risk Scores** (Market Risk + Liquidity Risk, per-pool). They are the closest thing to a "rating" output and are the differentiated signal; the raw rates dashboard largely duplicates other rate explorers, and Agent Sphere is synthesized text.

## Metric alignment

- **Ethereum-principles signal:** Essentially none. No decentralization, admin-key, upgradeability, governance, or exit-window assessment is exposed. (The RFP's "technical/operational risk" framing is not reflected in the observable product.)
- **Financial / market signal:** Strong and the dominant orientation — borrow/supply/funding rates, utilization, LTV, max leverage, liquidations, collateral-at-risk, supplier/borrower concentration (HHI), and the Market/Liquidity Risk Scores.

**Dominant orientation:** `financial-market`. Specific metrics: market-risk score, liquidity-risk score, rates, utilization, LTV, liquidation/collateral-at-risk, concentration (HHI).

**Diversity assessment:** This is operated by **Block Analitica**, already a registry feed whose focus is "quantitative on-chain risk dashboards for lending markets: liquidations, collateral health, market exposure." Sphere is the same vendor, same lending-market quantitative methodology, overlapping metrics. It therefore **duplicates** rather than complements BlockAnalitica in the registry and works against the oracle-diversity goal (RFP §1). Its per-pool risk-score scatter/radar packaging is a modest differentiator.

## Inclusion assessment

- **Verdict:** conditional
- **Reasoning:**
  - *Access:* Public, free-to-view dashboard (app.defi-sphere.com / sphere.blockanalitica.com) with no observed paywall. Leans toward inclusion-eligible. But no documented public API → automation would require scraping (fragile, possibly ToS-restricted).
  - *Scope breadth:* Narrow — lending markets only; covers roughly 6 of the Top 20 (Aave, Compound, Morpho, Spark, Fluid, Liquity) and N/A for DEXs, aggregators, staking, and most yield/vault protocols. Leans conditional.
  - *Is it actually a risk feed?* Yes — it produces explicit per-pool risk scores — but it is a financial/market risk dashboard, NOT the technical/operational rating implied by RFP §4. The §4 label appears inaccurate for the observable product.
  - *Neutrality & conflicts:* Operated by Block Analitica, which has commercial risk-management engagements with lending protocols (e.g. provides risk services to several listed protocols). Conflicts would need declaration per RFP §2.
  - *Redundancy:* High. Same operator and methodology as the existing BlockAnalitica entry; the two would substantially overlap on lending-market quant metrics. This is the strongest argument against full inclusion.
  - *Coverage relevance:* Does cover high-value Top-20 lending protocols (Aave, Morpho, Spark, Compound), which is why it is not an outright exclude.
  - **Net:** `conditional` — include only if (a) it is treated as distinct from BlockAnalitica with a clear delineation (per-pool risk scores vs. BlockAnalitica's protocol dashboards), and (b) the conflict-of-interest disclosure is satisfied. If the registry treats BlockAnalitica and DeFi Sphere as one vendor, prefer folding Sphere's risk scores into the BlockAnalitica entry rather than listing separately.

## How to fetch

- **Method:** `scrape`. No documented public REST API, data export, subgraph, or GitHub repo was found for Sphere data.
- **Targets:** Web app at `https://app.defi-sphere.com/` (also reachable as `https://sphere.blockanalitica.com/`). Per-protocol/market pages exist (e.g. `https://app.defi-sphere.com/aave_core`, `https://app.defi-sphere.com/markets?s=-total_supply_usd`). Data is rendered client-side (HTML/JS); a real implementation would likely need to capture the underlying XHR/JSON calls the SPA makes — those endpoints are **not documented publicly** and must be discovered via live inspection (out of scope here, no live probes).
- **Auth:** Unknown for any backing data calls. Dashboard viewing appears free/unauthenticated.
- **Rate limits / format:** Undocumented. Output surface is HTML/charts; underlying API format (likely JSON) is unconfirmed.
- **Docs Q&A helper (not a data API):** `GET https://docs.blockanalitica.com/agent-sphere/readme.md?ask=<question>` returns documentation answers, not feed data.

## Open questions / gaps

- **RFP §4 mismatch:** §4 labels DeFi Sphere a "Rating" provider for "technical, financial, and operational risk," but the observable product is a financial/market lending-analytics dashboard with two market/liquidity risk scores. Confirm whether a broader technical/operational rating product exists or is planned, or whether the §4 description is aspirational/inaccurate.
- **Vendor identity / redundancy:** Confirm whether DeFi Sphere should be a standalone registry entry or be merged with the existing BlockAnalitica entry (same operator).
- **Public data API:** Confirm via live inspection whether the SPA exposes a stable JSON/XHR endpoint that could be used instead of scraping; capture base URL, auth, and rate limits.
- **Exact Top-20 coverage:** Reconcile the two differing protocol lists (5 on landing page vs. 7 in docs corpus); confirm whether Gearbox and Euler are covered. Confirm Morpho Vaults granularity.
- **Auth/pricing tiers:** Confirm whether any institutional/paid tier gates data beyond the free dashboard view.

## Sources

- https://defi-sphere.com — landing page; product description "Institutional-grade DeFi lending intelligence. Real-time rates, risk scores, and analytics"; protocol list (Aave, Compound V3, Morpho, SparkLend, Liquity V2); "Developer: Block Analitica"; links to app/markets/sandbox and X (@TheDefiSphere).
- https://app.defi-sphere.com/ — web app, titled "Sphere by Block Analitica"; market explorer and per-protocol pages (e.g. /aave_core).
- https://blockanalitica.substack.com/p/introducing-sphere-risk-scores — Sphere Risk Scores v1: Market Risk Score and Liquidity Risk Score definitions, per-pool granularity, "all major stablecoins on mainnet," radar/scatter/table presentation, oracle/settlement scores in development.
- https://blockanalitica.substack.com/p/introducing-sphere — launch of Sphere as a rate explorer / analytics dashboard covering Aave, Compound, Morpho, SparkLend, Liquity V2.
- https://docs.blockanalitica.com/ — Block Analitica documentation portal; no public data API documented; references Agent Sphere.
- https://docs.blockanalitica.com/agent-sphere/ — Agent Sphere = LLM market-intelligence layer over the Sphere dashboard; docs Q&A `?ask=` helper; no data API/endpoints/auth documented.
- https://docs.blockanalitica.com/llms-full.txt — docs corpus; Sphere covers "Sky, Spark, Aave, Morpho, Compound, Fluid, Liquity"; describes metrics (yields, liquidity, risk) and Agent Sphere; no API/endpoints/pricing.
- https://consensys.io/staking/data and unrelated risk-framework results — disambiguation; confirmed defi-sphere.com is the relevant DeFi-risk entity, distinct from generic "DeFi score" frameworks and unrelated "Sphere" projects (e.g. Sphere Finance token, getsphere.com, sphere-engine.com).
