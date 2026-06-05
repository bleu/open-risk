---
name: LlamaRisk
slug: llamarisk
type: Research
focus: "Protocol risk research and parameter recommendations for DeFi. Analytics and monitoring focused on collateral and governance risk."
website: https://www.llamarisk.com/
docs_url: https://docs.llamarisk.com/
fetch_method: scrape
api_base: n/a
auth_required: unknown
data_format: html
source_repo: https://github.com/llama-risk
access: freemium
metric_orientation: mixed
recommendation: include
last_researched: 2026-06-05
confidence: medium
---

# LlamaRisk

LlamaRisk is an independent DeFi risk advisory and research firm that serves as a
risk service provider to major protocols (notably Curve, Aave, and Ethena). It
publishes prose risk assessments, post-mortems, and parameter recommendations,
and operates monitoring dashboards and the LlamaGuard infrastructure suite
(valuation, verification, enforcement, and onchain NAV via Chainlink). It does
not produce a single composite score; its output is qualitative research plus
parameter/governance recommendations.

## Coverage of Top 20

LlamaRisk's coverage is concentrated on the protocols it is contracted to
advise, plus collateral assets and stablecoins that touch those protocols. It is
not a broad, every-protocol registry.

- **Likely covered:** Aave (active risk service provider, ongoing parameter and
  Risk Steward recommendations on governance forum), Curve (formal services
  proposal April 2025–2026; LlamaLend post-mortems, Pegkeeper reviews, crvUSD
  monetary-policy work). Spark and Liquity appear indirectly via crvUSD/LlamaLend
  and stablecoin/Pegkeeper analysis but are not confirmed as dedicated coverage.
- **Not applicable / unlikely:**
  - Uniswap, Curve-as-DEX, Balancer, CoW Swap, 1inch, 0x/Matcha — LlamaRisk's
    focus is collateral, stablecoin, and lending-market risk; pure DEX/AMM and
    swap-aggregator routing risk is outside its published scope (Curve appears as
    a lending/stablecoin client, not as a DEX rating).
  - Yearn, Mellow, Morpho Vaults, Pendle, Compound, Euler, Fluid, Gearbox,
    Rocket Pool, Lido — no dedicated LlamaRisk research surfaced for these in the
    public research index; some may appear as collateral assets within Aave/Curve
    reports rather than as standalone coverage.
- **Notes:** Coverage was determined from the public research index
  (llamarisk.com/research), the dashboard's listed protocols (Aave, Midas,
  Ethena, Curve, with Aave Horizon "Coming Soon"), and governance-forum activity
  on Aave and Curve. Much of the deepest, structured monitoring sits in
  partner-specific dashboards, so per-protocol depth could not be fully
  confirmed from public surfaces.

## Data products & meaning

### Research reports (prose)
- **What it is:** Long-form risk assessments published on llamarisk.com/research
  (and historically research.llamarisk.com, now redirecting to the main site),
  categorized as Strategic Design, Protocol Assessment, Market Intelligence, and
  Asset Risk Assessment (ARA). Examples: "LlamaLend sDOLA-long2 Post-mortem,"
  "Pegkeeper Onboarding Review: Aave's GHO," "Asset Risk Assessment: Falcon
  USDf," "When Pricing Breaks: A USDe Case," "LayerZero OFT Standard: DeFi
  Exposure & Risk."
- **What it means:** Expert qualitative judgment on collateral quality,
  stablecoin peg risk, oracle design, and governance/admin control, often with
  explicit parameter recommendations (caps, LTV, IRM/monetary policy).
- **Shape / fields:** Free-form HTML articles / markdown. No standardized schema;
  not a per-protocol scored matrix. This is the verbatim-rating-style content the
  aggregator would surface.

### Risk Intelligence dashboards
- **What it is:** Per-partner monitoring environments at dashboard.llamarisk.com
  / portal.llamarisk.com tracking utilization, liquidity, oracle health/deviations,
  collateral composition, and systemic exposure. Live protocols listed: Aave,
  Midas, Ethena, Curve (Aave Horizon coming soon).
- **What it means:** Real-time quantitative health metrics for the protocols
  LlamaRisk monitors.
- **Shape / fields:** Rendered HTML dashboards; no documented public API or data
  export found.

### LlamaGuard suite (incl. LlamaGuard NAV)
- **What it is:** Risk infrastructure for protocols to onboard assets with
  automated valuation, reserve verification (see GitHub `save` "Generalized
  Proof-of-Reserve"), and enforcement. LlamaGuard NAV delivers onchain Net Asset
  Value via Chainlink's oracle network (used by Aave Horizon RWA markets).
- **What it means:** Onchain risk-management primitives, not a reporting feed —
  oriented at protocol integrations rather than at an external aggregator.
- **Shape / fields:** Onchain oracle outputs / contracts; integration product,
  not a queryable risk dataset.

**Most relevant to import:** The **research reports** (Protocol Assessment / ARA
content). They are public, map to specific protocols and collateral assets, and
are exactly the kind of verbatim, methodology-backed feed the aggregator shows
side by side. The dashboards and LlamaGuard are partner-integration products with
no confirmed public data surface.

## Metric alignment

- **Ethereum-principles signal:** Present but partial. Reports cover governance
  control, admin/ownership changes (e.g. "USDtb Ownership Changes"), oracle
  design, and Pegkeeper/onboarding governance — touching admin control and
  verifiability. Not a systematic decentralization-maturity framework.
- **Financial / market signal:** Dominant. Core output is collateral quality,
  stablecoin peg/depeg risk, liquidity, utilization, IRM/monetary-policy
  parameterization, liquidation and oracle-health monitoring, and market exposure.

Orientation: **mixed**, leaning financial/market with a strong
collateral-and-stablecoin specialization plus governance/admin-control
commentary. It **complements** rather than duplicates: it adds expert,
stablecoin/collateral-and-peg-focused qualitative research and parameter
recommendations grounded in being an actual risk service provider — a different
signal class from automated quantitative dashboards (BlockAnalitica) or
decentralization frameworks (DeFiScan/DeFiPunk'd).

## Inclusion assessment

- **Verdict:** include
- **Reasoning:**
  - *Access:* The research is publicly readable on the website (free), and there
    is a GitHub org plus public governance-forum posts. The deepest monitoring is
    in partner dashboards and LlamaGuard (gated/integration), but a substantial
    free public surface exists — so this clears the bar for inclusion as a
    public-good-visible feed (freemium).
  - *Scope breadth:* Narrower than a universal registry; coverage concentrates on
    Aave and Curve plus stablecoin/collateral assets. But these are two of the
    highest-value Top-20 protocols (Aave, Curve), so even a focused feed adds
    real coverage where capital concentration is greatest.
  - *Is it actually a risk feed?* Yes — it is a recognized, named DeFi risk
    research provider with explicit collateral and governance risk output, not a
    portfolio tool or generic explorer.
  - *Neutrality & conflicts:* IMPORTANT — LlamaRisk is a **paid risk service
    provider** to Curve and Aave (and works with Ethena). This is a commercial
    relationship with listed Top-20 protocols and must be declared per RFP
    neutrality requirement. It does not disqualify inclusion but must be disclosed
    in the registry's conflict notes.
  - *Redundancy:* Low. Its expert prose on stablecoin peg/collateral risk and
    parameter recommendations is a distinct methodology versus other registry
    feeds; supports the oracle-diversity goal.
  - *Coverage relevance:* High-value (Aave, Curve) coverage with a unique
    research/advisory lens justifies inclusion despite narrow breadth.

  Verdict is `include` rather than `conditional` because a free, public research
  surface exists and the coverage hits top-tier protocols; the commercial-conflict
  disclosure is a labeling requirement, not an exclusion trigger.

## How to fetch

- **Primary method — scrape:** Research articles are HTML pages under
  `https://www.llamarisk.com/research`. No documented public API. The aggregator
  would scrape/parse the research index and per-report pages to surface verbatim
  assessments and any stated parameter recommendations. Categorization tags
  (Strategic Design, Protocol Assessment, Market Intelligence, ARA) are visible
  in the index.
- **GitHub mirror:** `https://github.com/llama-risk/aave-research` holds
  community updates and frameworks (prose markdown, not structured data) and acts
  as an index pointing to governance forums and external dashboards. Useful as a
  secondary, version-controlled source for Aave-specific material. Other repos
  (`save` PoR, `curvesim`, `curve-ptoracle-vy`, oracle proxies) are tooling, not
  risk feeds.
- **Governance forums:** Aave (`governance.aave.com`) and Curve
  (`gov.curve.finance`) host LlamaRisk parameter recommendations and Risk Steward
  posts — a reliable, dated, public source for their actual recommendations.
- **Dashboards / LlamaGuard:** `dashboard.llamarisk.com`, `portal.llamarisk.com`,
  `docs.llamarisk.com` (LlamaGuard Docs). No public API or data export confirmed;
  treat as manual reference unless an endpoint is later verified.
- **Auth / rate limits / format:** Auth requirement for dashboards is unknown;
  research pages are open HTML. No documented rate limits. No live probes were
  performed (documentation-only).

## Open questions / gaps

- Does LlamaRisk expose any machine-readable API (JSON/CSV) for dashboard metrics
  or NAV feeds? `docs.llamarisk.com` returned only a "LlamaGuard Docs" title shell
  on fetch; the API surface (if any) could not be read.
- Are the partner dashboards (Aave/Curve/Ethena/Midas) public or login-gated?
  The portal landing page showed no explicit login wall but access tier is
  unconfirmed.
- Exact per-protocol coverage beyond Aave and Curve (e.g. whether Lido, Compound,
  Pendle, Liquity appear as dedicated assessments vs. incidental collateral
  mentions) needs a fuller crawl of the research archive.
- Conflict-of-interest scope: confirm the full list of Top-20 protocols LlamaRisk
  is commercially engaged with for the required disclosure.

## Sources

- https://www.llamarisk.com/ — official site; advisory, Risk Intelligence
  dashboard, LlamaGuard suite, research; clients Aave/Curve/Ethena/Chainlink.
- https://www.llamarisk.com/research — research index; report titles and
  categories (ARA, Protocol Assessment, etc.); protocols Curve, Ethena, Aave,
  Frax, Falcon, LayerZero confirmed.
- https://dashboard.llamarisk.com/risk-intelligence — dashboard product; live
  protocols Aave, Midas, Ethena, Curve; Aave Horizon coming soon.
- https://portal.llamarisk.com/ — Risk Monitor portal; monitoring (utilization,
  liquidity, oracle health, systemic exposure) + LlamaGuard suite.
- https://docs.llamarisk.com/ — "LlamaGuard Docs" (content not readable on fetch;
  no API surface confirmed).
- https://github.com/llama-risk — GitHub org; 10 repos (aave-research, save PoR,
  curvesim, curve oracle implementations); research repos are prose, not data.
- https://github.com/llama-risk/aave-research — prose community updates/frameworks
  indexing external dashboards and governance.
- https://gov.curve.finance/t/llamarisk-services-proposal-april-2025-2026/10489 —
  Curve services proposal; confirms paid risk-service-provider relationship.
- https://governance.aave.com/t/arfc-interest-rate-curve-risk-oracle/21900/2 —
  LlamaRisk Aave parameter/Risk-Oracle recommendations on governance forum.
- https://x.com/chainlink/status/1986216351753449979 — LlamaGuard NAV on Chainlink
  CRE for Aave Horizon RWA markets.
