---
name: RiskLayer
slug: risklayer
type: Rating
focus: AI-powered protocol risk scoring across five dimensions — dependency, governance, tokenomics, audit coverage, smart contracts
website: https://risklayer.online
docs_url: n/a
fetch_method: scrape
api_base: n/a
auth_required: false
data_format: html
source_repo: n/a
access: free
metric_orientation: mixed
recommendation: include
last_researched: 2026-06-12
confidence: medium
---

## Overview

RiskLayer (risklayer.online) is a beta DeFi risk terminal by Chainrisk Labs that provides per-protocol risk scores using an AI risk engine across five equally-weighted dimensions: Dependency Risk, Governance Risk, Tokenomics Risk, Audit Coverage Risk, and Smart Contract Risk.

Note: risklayer.online is the active product. risklayer.xyz (the EigenLayer AVS middleware) is a separate, older project that appears inactive (site down since at least mid-2025).

## Overall score

Yes. Per-protocol 0-10 risk score with risk level (MODERATE / ELEVATED). Also provides per-dimension breakdowns.

## Data availability

Yes. The overall per-protocol score is returned directly in the dashboard HTML at https://risklayer.online/protocols. No documented public API.

## Coverage of top 20

9/20 confirmed: Curve (6.7), Aave (5.9), Compound (5.9), Pendle (5.7), Spark (4.9), Rocket Pool (4.8), Morpho (4.8), Lido (4.2), Uniswap (4.0). Additional non-seed protocols: GMX, Ethena, EigenLayer.

## How to fetch

Scrape the protocols page:

Fetch: `https://risklayer.online/protocols` — HTML dashboard with per-protocol risk scores embedded in the page. Parse protocol cards for score (0-10), risk level, and dimensional breakdowns.

No auth required. No documented API or rate limits.

## Open questions

- No public API — currently scrape-only. Check if underlying JSON endpoints exist via network inspection.
- Product is labeled "beta" — outputs may change.
- Operator identity / team behind risklayer.online not clearly disclosed on the site.
- Relationship between risklayer.online and the risklayer.xyz EigenLayer AVS project needs clarification.

## Sources

- https://risklayer.online — landing page
- https://risklayer.online/protocols — protocol scores dashboard

## Inclusion

Yes. Provides overall per-protocol risk scores covering 9/20 seed protocols, freely available on a public dashboard. Mixed orientation (governance + smart contract + financial dimensions) adds diversity to the registry.
