---
name: Zyfai Risk
slug: zyfai
type: Dashboard
focus: "Real-time risk score dashboard for DeFi liquidity pools. Tracks risk metrics, TVL, APY, and security grades across pools."
website: https://risk.zyf.ai/
docs_url: https://docs.zyf.ai/
fetch_method: unknown
api_base: n/a
auth_required: unknown
data_format: html
source_repo: n/a
access: free
metric_orientation: financial-market
recommendation: exclude
last_researched: 2026-06-05
confidence: medium
---

# Zyfai Risk

Zyfai Risk (risk.zyf.ai) is a free, browser-based risk-score dashboard for DeFi
liquidity pools, operated by Zyfai — an automated, non-custodial cross-chain
**yield agent** that rebalances user funds across lending/yield protocols. The
dashboard exists primarily to surface the pools Zyfai's own quant team assesses
and rebalances into; it grades pools (reportedly A–F) on risk while showing TVL,
APY, and a security/audit signal.

## Coverage of Top 20

Zyfai's universe is its own integration set across **L2/alt-L1 chains** (Base,
Arbitrum, Sonic, Plasma — Ethereum **mainnet is not listed** as a supported
chain). Its integrated protocols are lending/yield venues: Aave, Compound v3,
Euler, Fluid, Harvest, Moonwell, Morpho, Silo, Spark, Wasabi (across ~34 pools).
The risk dashboard is reported to span a much larger pool index (thousands of
pools across many chains), but coverage is pool-/chain-keyed, not Ethereum-
mainnet protocol-keyed.

- **Likely covered (as protocols, but on non-mainnet deployments):** Aave,
  Compound, Euler, Fluid, Morpho, Spark — these appear in Zyfai's integration
  list, but the dashboard scores their **Base/Arbitrum/Sonic** pools, not the
  Ethereum mainnet markets the RFP requires. Mainnet coverage is unconfirmed.
- **Not applicable:** Uniswap, Curve, Balancer, CoW Swap, 1inch, 0x/Matcha,
  Lido, Rocket Pool, Pendle, Mellow, Yearn, Liquity, Gearbox — Zyfai is a
  lending/stablecoin-yield agent (USDC/WETH deposit assets); DEX/AMM, swap
  aggregators, liquid staking, and yield-tokenization protocols fall outside its
  pool universe. Morpho Vaults are partially adjacent (Morpho is integrated) but
  not confirmed as a scored entity on mainnet.
- **Notes:** Coverage inferred from Zyfai's integration list and chain support
  (IQ.wiki, marketing, SDK docs). The dashboard is a JS SPA; its full pool list
  could not be enumerated from public HTML, and no per-protocol mainnet index
  was confirmed.

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

### Zyfai SDK / Data API (docs.zyf.ai) — adjacent, not the risk feed
- **What it is:** A TypeScript SDK over two backends: an Execution API
  (`/api/v1`: Safe wallet deploy, deposits, withdrawals, session keys) and a Data
  API (`/api/v2`: earnings, opportunities, APY history, analytics).
- **What it means:** Built for driving Zyfai's yield product, not for serving
  risk ratings. Methods include `getPositions()`, `getOnchainEarnings()`,
  `getDailyApyHistory()`. **No risk-score endpoint is documented**; risk scoring
  appears internal to the optimization engine.
- **Shape / fields:** Not fully specified in public docs; chains are Arbitrum
  (42161), Base (8453), Plasma (9745); deposit assets USDC/WETH.

**Most relevant to import:** The risk.zyf.ai pool grades would be the only
candidate feed, but it is not exposed via a documented public API and is keyed to
non-mainnet pools — making it the wrong shape for this aggregator.

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

- **Verdict:** exclude
- **Reasoning:**
  - *Ethereum-native (hard RFP requirement):* Zyfai operates on Base, Arbitrum,
    Sonic, and Plasma; **Ethereum mainnet is not a supported chain**. Its risk
    grades describe L2/alt-L1 pool deployments, not the mainnet markets of the
    Top-20. This alone is disqualifying for a mainnet-focused v1.
  - *Is it actually a neutral risk feed?* It is a **yield agent's internal
    opportunity-screening dashboard**, surfaced publicly. Its purpose is to route
    Zyfai's own capital, not to serve as an independent third-party rating. That
    is a neutrality/conflict concern: the grades are coupled to the protocols
    Zyfai integrates and earns on.
  - *Access:* The dashboard is free to view, but there is **no documented public
    API or data export** for the risk grades; it is a JS SPA, so automation would
    require scraping an undocumented surface — weak for the feed-automation goal.
  - *Redundancy:* Financial/market orientation already well covered by
    BlockAnalitica, pigi.finance, Xerberus, Philidor; Zyfai adds no new method or
    signal axis.
  - *Coverage relevance:* Even read generously, it touches only lending
    protocols, and on the wrong chains — no unique high-value mainnet coverage.

  Could be reconsidered as `conditional` only if Zyfai (a) confirms Ethereum
  mainnet pool coverage for Top-20 protocols and (b) exposes the risk grades via
  a documented public API. Neither is established today.

## How to fetch

No documented, supported fetch path for the risk grades.

- **Risk dashboard:** risk.zyf.ai is a single-page web app. Data is loaded
  client-side, likely from an internal JSON backend, but **no public endpoint,
  auth scheme, or schema is documented**. Any ingestion would mean reverse-
  engineering network calls (scrape of an undocumented API) — not recommended
  and out of scope for documentation-only research.
- **Zyfai SDK / Data API:** `/api/v2` (data) and `/api/v1` (execution) exist for
  the yield product but expose opportunities/earnings/APY history, **not risk
  scores**. Base URL, auth, and rate limits are not fully specified publicly;
  chains limited to Arbitrum/Base/Plasma.
- **GitHub:** No public Zyfai risk repository found.

Auth/rate limits/format for the risk feed: unknown. Documentation-only — no live
probes were made.

## Open questions / gaps

- Does risk.zyf.ai score **Ethereum mainnet** pools for any Top-20 protocol, or
  only L2/alt-L1 deployments? (Public sources indicate no mainnet chain support.)
- Is the A–F grade scale confirmed by Zyfai's own docs, or only by secondary
  write-ups? The exact grade scale and methodology were not found on a primary
  Zyfai page.
- Is there an undocumented public/internal JSON API behind the dashboard that
  could be ingested, and under what terms?
- Are there disclosed commercial relationships between Zyfai and the listed
  protocols it integrates (advisor Marc Zeller is Aave-affiliated) that would be
  a neutrality concern if this feed were ever included?
- Full pool/protocol index of the dashboard could not be enumerated from the SPA.

## Sources

- https://risk.zyf.ai/ — the risk dashboard itself (JS SPA; title confirms "Pool
  Risk Scores & Analytics"; full content not server-rendered).
- https://www.zyf.ai/transparency — Zyfai positions risk.zyf.ai as its quant
  team's daily opportunity-assessment tool (TVL, liquidity, IRM, collateral
  quality, permissionless inputs).
- https://docs.zyf.ai/docs/sdk/getting-started — SDK/API docs: chains
  Arbitrum/Base/Plasma, USDC/WETH assets, Data API `/api/v2` (opportunities,
  earnings, APY history); no risk-score endpoint documented.
- https://docs.zyf.ai/f.a.q — FAQ (non-custodial model; users rely on integrated
  protocols' contract security; Zyfai holds no vault contracts).
- https://iq.wiki/wiki/zyfai — profile: chains Base/Sonic/Arbitrum/Plasma
  (no Ethereum mainnet); integrated protocols (Aave, Compound v3, Euler, Fluid,
  Harvest, Moonwell, Morpho, Silo, Spark, Wasabi); backers/advisors incl. Marc
  Zeller; ~$8.5M TVL (Nov 2025).
- WebSearch ("risk.zyf.ai ... methodology security grade") — secondary reports of
  A–F grades, 30d mean APY + prediction, and a multi-factor scoring framework;
  not confirmed on a primary Zyfai page.
</content>
</invoke>
