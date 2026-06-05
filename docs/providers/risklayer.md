---
name: RiskLayer
slug: risklayer
type: Rating
focus: "Economic security middleware built on EigenLayer. Proof of Risk consensus for decentralized, validator-attested risk scores."
website: https://www.risklayer.xyz/
docs_url: unknown
fetch_method: unknown
api_base: n/a
auth_required: unknown
data_format: unknown
source_repo: https://github.com/Chainrisk-Cloud
access: gated
metric_orientation: financial-market
recommendation: exclude
last_researched: 2026-06-05
confidence: low
---

# RiskLayer

RiskLayer is a proposed DeFi "economic security middleware" built on EigenLayer by Chainrisk Labs (Chainrisk, chainrisk.xyz). It pitches a "Proof of Risk" consensus in which restaked validators attest to per-market, per-asset risk scores (0 = high risk, 1 = low risk) via a Risk Oracle AVS, with a Risk Rollup AVS for risk-aware app-specific rollups. As of research it appears to be a pre-staking-stage / largely conceptual product with no confirmed public risk feed.

## Coverage of Top 20

RiskLayer is positioned as middleware producing per-market/per-asset risk scores, not as a published rating registry over a fixed protocol list. Its parent, Chainrisk, does economic risk audits/parameter work for specific clients, so any "coverage" is client-engagement-driven rather than a broad public matrix.

- **Likely covered:** unknown — could not confirm from public surfaces. Chainrisk (parent) has engaged with **Compound** among the Top 20 (economic audit of Compound V3), so Compound is the only Top-20 protocol with any documented Chainrisk/RiskLayer relationship. Other named Chainrisk clients (Angle, Gyroscope, Ebisu, Superlend, Polynomial, Swaylend, Multipli, Arbitrum, Fuel) are not in the Top 20.
- **Not applicable:** The remaining 19 Top-20 protocols (Spark, Aave, Morpho, Fluid, Gearbox, Euler, Liquity, Uniswap, Curve, Balancer, CoW Swap, 1inch, 0x/Matcha, Yearn, Mellow, Morpho Vaults, Pendle, Lido, Rocket Pool) — no evidence of any RiskLayer-produced, publicly fetchable risk score for any of them. The model is per-engagement, not a standing public feed.
- **Notes:** Coverage could not be determined: the risklayer.xyz site refused connection on every fetch attempt, and no public protocol index, dashboard listing, or score registry was found. Determination is by reasoning from the published architecture (Medium intro, press, parent Chainrisk site) only.

## Data products & meaning

### Risk Oracle AVS (risk scores)
- **What it is:** The core data layer. "Risk Nodes (SPNs)" run statistical models / ML to produce a risk score per user per market per asset; "Risk Validators" validate and "Risk Finality Providers" finalize via the Proof of Risk consensus. Economic security is borrowed from restaked ETH on EigenLayer.
- **What it means:** A single normalized risk number on a 0–1 scale (0 = high risk, 1 = low risk) intended to let capital be allocated/deployed against quantified risk. It is a market-/position-level economic-risk signal, not a decentralization or governance assessment.
- **Shape / fields:** Not documented publicly. Implied: an on-chain/oracle value keyed by (user, market, asset) → score in [0,1]. No field schema, endpoint, or contract address was found.

### Risk Rollup AVS (consumer layer)
- **What it is:** App-specific rollups, economically secured by RiskLayer, that consume Risk Oracle feeds to build "risk-intelligent" structured products that dynamically adjust parameters.
- **What it means:** A developer/infrastructure product, not a published risk dataset — it consumes the oracle rather than emitting a comparable rating.
- **Shape / fields:** Not a fetchable rating feed; out of scope as an importable source.

**Most relevant to import:** The Risk Oracle AVS score (0–1) is the only thing resembling an importable "rating." However, no public surface, schema, endpoint, or live deployment for it could be confirmed, so it is not currently importable.

## Metric alignment

- **Ethereum-principles signal:** Minimal/none. RiskLayer does not assess decentralization, key/admin control, upgradeability, governance, or exit windows. (Notably, its parent Chainrisk's *own* operation — expired TLS on the community dashboard, an org with simulation repos but no risk-oracle code — is itself centralized/opaque, the opposite of the ethereum-principles signal the registry values.)
- **Financial / market signal:** This is the dominant orientation. The scores derive from quantitative/ML modeling of economic risk — liquidations, collateral health, market exposure, value-at-risk style stress simulations (Chainrisk's Simulation Engine). It is a market/credit-risk number.
- **Orientation:** **financial-market.** Specific metrics: a normalized 0–1 economic-risk score per market/asset, backed by VaR-style simulations.
- **Diversity vs. registry:** It would **duplicate** the financial-market quantitative-risk lane already covered far better and more publicly by BlockAnalitica, Credora, DeFi Saver, and others. It adds a novel *mechanism* (validator-attested, EigenLayer-secured consensus) but no novel *signal*, and the mechanism is not realized as accessible data.

## Inclusion assessment

- **Verdict:** exclude
- **Reasoning:**
  - *Access:* No public, fetchable data surface could be found. The website (risklayer.xyz) refused connection on every attempt; the parent community dashboard's TLS certificate has expired. The product is described as "pre-staking" / early-access middleware, not a live published feed → strongly leans **exclude** (cannot be automated or shown as a public good).
  - *Maturity / liveness:* All substantive public material dates to mid-2024 (Builders Round, July 2024 Medium post). No evidence of a live mainnet Risk Oracle AVS, no contract addresses, no API, no GitHub repo implementing it (the Chainrisk-Cloud org has only simulation/report repos). Reads as conceptual or stalled.
  - *Scope breadth:* No standing coverage of the Top 20 — at most an indirect Chainrisk relationship with Compound. Per-engagement, not a public matrix.
  - *Is it actually a risk feed?* It is *infrastructure to produce* risk scores, not a published rating registry the aggregator can quote verbatim. The verbatim-ratings model the RFP requires has nothing to point at.
  - *Redundancy:* The financial-market signal is already well covered by more accessible registry feeds.
  - *Conflicts:* Parent Chainrisk has paid economic-audit relationships with protocols (e.g. Compound) — a commercial-tie/neutrality concern that would need disclosure if ever included.
  - Net: no public data + no liveness + redundant signal → **exclude**. Could move to **conditional** only if a live Risk Oracle AVS with a public, fetchable score feed materializes and covers Top-20 protocols.

## How to fetch

No documented fetch method. The intended architecture implies the risk score would live as an on-chain oracle value (read via an EigenLayer AVS / oracle contract) keyed by market/asset, but **no contract address, ABI, subgraph, API endpoint, or schema was found in any public source**. There is no developer/docs portal that resolved. The Chainrisk-Cloud GitHub org (https://github.com/Chainrisk-Cloud) contains only simulation and solvency-report repos, none implementing the Risk Oracle AVS. Practically: **fetch_method = unknown / none currently**; would require live verification against a deployed AVS that has not been confirmed to exist publicly.

## Open questions / gaps

- Is the Risk Oracle AVS actually deployed on EigenLayer mainnet, and if so, what are the contract addresses? Unconfirmed.
- Is risklayer.xyz still live? All WebFetch attempts returned ECONNREFUSED — the site may be down, geo/bot-blocked, or deprecated. Needs live verification.
- Is there any public API, subgraph, or oracle read path for the 0–1 risk scores? None found.
- What is the relationship/branding split between "RiskLayer" and parent "Chainrisk"? Chainrisk's site no longer foregrounds RiskLayer branding — possible pivot or de-prioritization since the 2024 raise.
- Which Top-20 protocols, if any, have current RiskLayer scores? Only an indirect Compound (Chainrisk audit) link found.
- Is the project still active in 2025–2026? No public updates found after mid-2024; status uncertain.

## Sources

- https://www.risklayer.xyz/ — official site (search snippet: "Democratizing App-Specific Risk Feeds"); refused direct connection (ECONNREFUSED) on all fetch attempts.
- https://risklayer.medium.com/introducing-risklayer-the-scaling-middleware-enabling-risk-intelligent-defi-46ea61e8c2a9 — primary architecture description (July 24, 2024): Risk Oracle AVS, Risk Rollup AVS, Proof of Risk consensus, 0–1 risk score scale, Risk Nodes/Validators/Finality Providers, ML/statistical modeling.
- https://www.globenewswire.com/news-release/2024/07/25/2918717/0/en/RiskLayer-announces-its-Builders-Round-led-by-Antler-for-building-a-DeFi-Security-Middleware-on-EigenLayer.html — Builders Round funding (Antler, Momentum6), developed by Chainrisk Labs, client list, pre-staking plan.
- https://cryptobriefing.com/risklayer-funding-security-eigenlayer/ — corroborating funding/architecture coverage; Chainrisk Labs ~$10B AUM, clients incl. Compound.
- https://chainrisk.xyz/ — parent company site: economic modelling/simulation, real-time parameter recommendations, vault curation; clients incl. Compound; community.chainrisk.xyz/polynomial dashboard; no RiskLayer branding or API/docs portal.
- https://github.com/Chainrisk-Cloud — parent GitHub org: 5 repos (asset verification, solvency report, synth-subnet, compound-abs-scripts, Economic-Hacks-Simulation); none implement a Risk Oracle AVS or risk feed.
- https://community.chainrisk.xyz/polynomial — parent's client dashboard; fetch failed with expired TLS certificate (maintenance/liveness signal).
- https://www.crunchbase.com/organization/risklayer — company profile (pre-seed); returned HTTP 403, not readable.
