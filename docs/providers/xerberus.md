---
name: Xerberus
slug: xerberus
type: Rating
focus: Independent risk ratings (AAA-D) for DeFi assets, protocols, and organisations via incident-anchored dendrogram
website: https://xerberus.io/
docs_url: https://xerberus.gitbook.io/documentation
fetch_method: api
api_base: https://api.xerberus.io/public/v1
auth_required: true
data_format: json
source_repo: https://github.com/XerberusTeam
access: freemium
metric_orientation: mixed
is_rfp_suggestion: true
recommendation: conditional
last_researched: 2026-06-08
confidence: high
---

## Overview

Xerberus is an independent, non-profit risk-rating protocol that publishes letter-grade ratings (AAA-D) for DeFi assets, protocols, and organisations, built from 300+ subscores across 85+ failure mechanisms organised in a dendrogram. Each subscore must reference a real historical incident (Terra/Luna, Euler, FTX, etc.). Funded by investors, never by rated issuers.

## Overall score

Yes. AAA-D letter grades for assets, plus 0-100 numeric scores for protocols/organisations/vaults via the registry endpoint.

## Data availability

Yes. Free REST API (data itself is free, "ratings will always remain open and accessible"). API key required — obtained by emailing ms@xerberus.io. Key expires ~1 year after issuance. Rate limit: 10 req/60s.

## Coverage of top 20

Confirmed: Aave (v3), Morpho, Morpho Vaults, Spark, Lido. Vault platforms: morpho, spark. Token-level ratings (stETH, WETH, USDC) touch additional protocols. Full Top-20 coverage unconfirmed — needs live API enumeration.

## How to fetch

REST API. Base: `https://api.xerberus.io/public/v1`. Auth: `x-api-key` + `x-user-email` headers.

Key endpoints:
- `GET /risk/ethereum` — Ethereum asset ratings (asset_name, risk_category AAA-D)
- `GET /risk/score/asset?fingerprint=<id>` — single asset rating
- `GET /registry/scores` — protocol/organisation/pool scores (0-100)
- `GET /vault/list` — active vaults per platform with scores
- `GET /vault/reports/download/:vaultAddress` — dendrogram report

## Open questions

- API key expires annually — needs permanent key or yearly rotation process for automation.
- Full Ethereum protocol coverage needs live enumeration.
- Whether DEX/AMM protocols (Uniswap, Curve, Balancer) receive protocol-level ratings is unconfirmed.

## Sources

- https://xerberus.io/ — product overview
- https://xerberus.gitbook.io/documentation — API docs
- https://github.com/XerberusTeam — open-source repos (metrics SDK, simulation engine)
- https://app.xerberus.io/risk/ratings — live ratings UI

## Inclusion

Conditional. Provides genuine risk ratings via a free API with open methodology. Condition: API key expires annually — needs a permanent key or yearly rotation arrangement.
