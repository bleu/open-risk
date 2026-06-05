---
name: Credora
slug: credora
type: Rating
focus: "Institutional-grade credit risk ratings for DeFi protocols and borrowers"
website: https://www.credora.network/
docs_url: https://docs.redstone.finance/docs/redstone-credora/
fetch_method: api
api_base: https://api.credora.io/graphql
auth_required: true
data_format: json
source_repo: n/a
access: gated
metric_orientation: financial-market
recommendation: conditional
last_researched: 2026-06-05
confidence: medium
---

# Credora

Credora produces standardized, institutional-grade credit risk ratings for DeFi
vaults, markets, and collateral assets, anchored to probability-of-default style
methodology and a letter-grade scale (A+ through D). Credora was acquired by the
oracle network RedStone in September 2025 and now operates as "Credora by
RedStone," delivering ratings via a GraphQL API and a public ratings dashboard,
initially across Morpho and Spark lending ecosystems.

## Coverage of Top 20

Credora rates lending markets, vaults, and their underlying collateral assets.
Its confirmed launch surface is Morpho and Spark, with stated plans to "expand to
all major lending protocols."

- **Likely covered:**
  - **Spark** — explicit launch protocol; a Spark Savings risk assessment report
    exists (reports.credora.io/spark/latest.pdf).
  - **Morpho** and **Morpho Vaults** — explicit launch protocol; vault ratings
    (A+–D) display on Morpho when curators opt in. The MetaMorpho/curated-vault
    layer is a primary target of Credora's vault-rating methodology.
  - **Aave, Euler, Compound, Fluid** (lending) and **Pendle, Yearn, Mellow**
    (yield/vault) — plausible near-term targets given the "all major lending
    protocols" and "thousands of yield and vault strategies" roadmap, but NOT
    confirmed on public surfaces as of this research. Treat as unconfirmed.
- **Not applicable:**
  - **Uniswap, Curve, Balancer, CoW Swap, 1inch, 0x / Matcha** — DEXes / swap
    aggregators. Credora rates credit/default risk of lending markets and
    yield-bearing vaults/collateral, not AMM swap venues, so a "creditworthiness"
    rating does not map cleanly. (Credora may rate an LP/vault strategy *built on*
    these, but not the swap protocol itself.)
  - **Lido, Rocket Pool** — liquid staking protocols. Credora can rate stETH/rETH
    as collateral *assets* inside a rated market/vault (asset-layer analysis), but
    does not issue a protocol-level credit rating for the staking protocol itself.
- **Notes:** Coverage determined from RedStone launch announcement, the Morpho
  governance forum post, and the Credora docs/dashboard. Exact per-vault and
  per-market coverage was not enumerable from public surfaces without querying the
  live dashboard/API; the rated set is opt-in (curator-gated for Morpho display)
  and growing, so the covered list is a moving target.

## Data products & meaning

### DeFi Risk Ratings (vaults, markets, assets)

- **What it is:** A risk rating per rated product. Vaults get an intuitive letter
  grade (A+ through D). Markets and underlying collateral assets carry numerical
  measures: Probability of Default (PD, the likelihood an asset/borrower cannot
  meet obligations over 12 months) and Probability of Significant Loss (PSL, the
  annualized probability of losing more than 1% of principal/market supply to bad
  debt). Letter grades also map to "implied traditional ratings" comparable to
  T-bills / corporate debt.
- **What it means:** A single quantitative, cross-protocol standard for credit
  risk. Methodology spans three layers — asset layer (collateral quality, issuer
  risk, default behavior), market layer (liquidity, volatility, liquidation
  mechanics, oracle design), and vault layer (strategy, curator incentives,
  governance, operational control). All grades anchor to a PD curve calibrated on
  historical default data (1990–2023) so a given letter corresponds to a
  comparable long-run default probability. Aggregate output is partly determined
  by an expert/"consensus" process (the Credora Network), not solely an automated
  model.
- **Shape / fields:** GraphQL `ratings` query returns items with `id`, `address`,
  `chainId`, `name`, `protocol`, `product`, `curator { name }`, `ratingType`
  (`indicative` or `commissioned`), and `Metrics { rating, psl, publishDate }`.
  Letter `rating` is the headline; `psl` is the loss-probability metric. PD and
  implied-traditional-rating fields are described in methodology but were not
  listed in the API ratings schema surface inspected.

### Ratings dashboard / reports

- **What it is:** A web dashboard (ratings.credora.network) showing ratings per
  vault/market, plus published PDF risk assessment reports (reports.credora.io).
- **What it means:** Human-readable presentation of the same ratings, with full
  rationale/transparency into each rating.
- **Shape / fields:** HTML dashboard + PDF reports (verbatim narrative + grade).

**Most relevant to import:** The **GraphQL Risk Ratings API**
(`https://api.credora.io/graphql`). It is machine-readable, returns the verbatim
letter grade plus PSL and metadata per product, and supports
protocol/product/chain/curator filtering — ideal for an automated, per-protocol
coverage matrix. The dashboard/PDF reports are the manual fallback for the
verbatim narrative shown on protocol detail pages.

## Metric alignment

- **Ethereum-principles signal:** Low. Credora does not primarily measure
  decentralization, key/admin control, upgradeability, governance neutrality, or
  exit windows as trust-minimization properties. Governance and operational
  control appear only as inputs to a credit grade, not as standalone
  "who can rug it" signals.
- **Financial / market signal:** Dominant. PD, PSL, collateral quality,
  liquidity, volatility, liquidation mechanics, oracle design, and credit risk —
  classic financial/market risk, expressed as a credit rating.

**Orientation: financial-market.** Specific metrics: letter rating (A+–D),
Probability of Default, Probability of Significant Loss, implied traditional
rating. Within the registry it **complements** decentralization-focused feeds
(DeFiScan, DeFiPunk'd) and partially **overlaps** with quantitative on-chain risk
dashboards (BlockAnalitica) and other rating feeds (RiskLayer, Xerberus,
Philidor) — but its distinctive value is the credit-rating framing (PD/PSL
anchored to a traditional-finance default curve and an expert-consensus process),
which no other listed feed offers in the same form.

## Inclusion assessment

- **Verdict:** conditional
- **Reasoning:**
  - *Access:* The data is **gated** — the GraphQL API requires a whitelisted API
    key (`ClientSecret` header), granted via a Google Form approval. However, the
    `ratings.credora.network` dashboard and published PDF reports provide a public
    surface, and the Morpho integration is "at no cost." So there IS a publicly
    viewable surface even though automated API access is approval-gated. This
    keeps it out of full **exclude** and supports **conditional**.
  - *Scope breadth:* Confirmed coverage is narrow today (Morpho + Spark), but
    these are high-value Top-20 protocols (Morpho, Morpho Vaults, Spark), and the
    roadmap is "all major lending protocols," which directly targets the Top-20
    lending set. Coverage relevance is high even if breadth is currently limited.
  - *Is it actually a risk feed?* Yes — it is a genuine, methodology-backed risk
    rating service, exactly the "Rating" type RFP §4 assigns it.
  - *Neutrality & conflicts:* Note potential conflict — `ratingType` includes
    `commissioned` (protocol-paid/applied-for) vs `indicative`, and Credora is now
    owned by RedStone, an oracle provider with commercial DeFi integrations. The
    aggregator should surface the `ratingType` and the RedStone ownership as a
    declared conflict/provenance tag.
  - *Redundancy:* Complements rather than duplicates — credit-rating (PD/PSL)
    framing is unique among the registry feeds.
  - *Coverage relevance:* Uniquely valuable for Morpho Vaults and Spark with an
    institutional credit lens.

  Net: **conditional** — include if the team can obtain API whitelist access OR is
  willing to scrape/manually curate from the public dashboard/PDF reports, and if
  the gated/commissioned nature and RedStone ownership are clearly disclosed as
  provenance.

## How to fetch

- **Primary — GraphQL API.** Base: `https://api.credora.io/graphql`. Standard
  GraphQL over HTTP POST. Auth: API key required in header `ClientSecret:
  <your-api-key>`; keys are issued only after whitelist approval via a Google
  Form. Unauthenticated/invalid requests return `UNAUTHENTICATED` /
  "Unauthorized: Invalid or missing API key." Example query:

  ```graphql
  query GetAllRatings {
    ratings(page: 0, limit: 1) {
      totalCount
      items {
        id
        address
        name
        chainId
        protocol
        ratingType
        product
        curator { name }
        Metrics { rating psl publishDate }
      }
    }
  }
  ```

  Supports pagination (`page`, `limit`) and filtering by protocol/product/chain/
  curator. Format: JSON.
- **Fallback — dashboard scrape.** `https://ratings.credora.network/` renders the
  same ratings; `https://reports.credora.io/<protocol>/latest.pdf` (e.g.
  `/spark/latest.pdf`) publishes verbatim PDF assessment reports.
- **Onchain.** RedStone positions Credora ratings to be "available natively
  onchain" via its oracle stack, but a specific ratings oracle contract address,
  feed ID, or push/pull mechanism was NOT documented on the public surfaces
  inspected. Treat onchain access as unconfirmed.
- Rate limits: not documented publicly.
- No live API probe was performed (documentation-only per skill rules).

## Open questions / gaps

- Exact list of currently rated Morpho vaults/markets and Spark
  products — requires querying the live dashboard/API.
- Whether any Top-20 protocols beyond Morpho/Morpho Vaults/Spark are rated today
  (Aave, Euler, Compound, Fluid, Pendle, Yearn, Mellow) — roadmap implies yes,
  but unconfirmed.
- Onchain ratings oracle: contract address, feed/data-feed ID, update cadence,
  push vs pull — not found; needs RedStone technical docs verification.
- Full GraphQL schema (does it expose PD and implied-traditional-rating fields, or
  only `rating` + `psl`?) — only a partial schema was visible.
- API access terms: cost/tier after whitelist, rate limits, and whether the
  public-good aggregator would be approved for a key.
- `commissioned` vs `indicative` distinction and how it should be flagged as a
  conflict/provenance tag.
- Name-collision note: "Credora" also returns unrelated entities (Credas,
  Credova, cred.ai, Finaro/Credorax). The correct DeFi entity is
  credora.network / Credora by RedStone (formerly X-Margin).

## Sources

- https://www.credora.network/ — official site; products (Ratings Protocol, Risk
  Oracle, Rating Application, API), dashboard at ratings.credora.network, docs at
  docs.redstone.finance.
- https://docs.redstone.finance/docs/redstone-credora/ — official docs landing;
  "risk ratings of tokens and vaults," launch on Morpho and Spark.
- https://docs.redstone.finance/docs/redstone-credora/api-documentation — GraphQL
  endpoint (api.credora.io/graphql), `ClientSecret` API-key auth, whitelist via
  Google Form, UNAUTHENTICATED error.
- https://docs.redstone.finance/docs/redstone-credora/api-documentation/ratings/ —
  ratings GraphQL schema/fields (rating, psl, ratingType, curator, etc.) and
  example query; PSL definition.
- https://blog.redstone.finance/2025/11/06/redstone-brings-credora-to-market-following-acquisition-introducing-defi-risk-ratings-to-morpho-and-spark/
  — launch on Morpho and Spark, GraphQL delivery, creditworthiness/PD/risk
  profiles, "all major lending protocols" roadmap, 90%+ automation.
- https://forum.morpho.org/t/credora-network-risk-ratings-on-morpho-1652 — Morpho
  vault ratings A+–D, curator opt-in, "at no cost for the Morpho DAO," PD/PSL for
  assets/markets.
- https://www.crowdfundinsider.com/2025/09/249989-defi-oracle-network-redstone-acquires-credit-rating-firm-credora/
  — RedStone acquired Credora (Sept 2025).
- https://www.prnewswire.com/news-releases/credora-unveils-the-credora-network-consensus-ratings-for-defi-302373640.html
  — Consensus Ratings Protocol; expert contributors (Jump Crypto, GSR, XBTO).
- https://reports.credora.io/spark/latest.pdf — example published PDF risk
  assessment report (Spark Savings).
- https://www.dlnews.com/research/internal/the-year-of-riskaware-defi-credora-ratings-as-the-1t-unlock-primitive/
  — PD curve calibrated on 1990–2023 default data; three-layer methodology;
  letter scale and implied traditional ratings.
