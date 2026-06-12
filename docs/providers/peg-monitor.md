---
name: Peg Monitor
slug: peg-monitor
type: Data
focus: Stablecoin peg health — current deviation from $1.00 and worst historical depeg
website: n/a
docs_url: n/a
fetch_method: api
api_base: https://stablecoins.llama.fi
auth_required: false
data_format: json
source_repo: n/a
access: free
metric_orientation: financial-market
is_rfp_suggestion: false
recommendation: include
last_researched: 2026-06-12
confidence: high
---

## Overview

Peg Monitor is an internal composite data source that tracks stablecoin peg health. It combines current price data from DeFiLlama's stablecoins API with historical depeg data from known incidents to produce two metrics: current peg deviation and worst historical depeg percentage.

## Overall score

No overall score. Two metrics per stablecoin: peg-deviation (current % off $1.00) and max-depeg (worst historical % off peg). Yield-bearing stablecoins (USYC, USDY, BUIDL) have null values since they're designed to appreciate above $1.

## Data availability

Yes. Underlying data from DeFiLlama stablecoins API (free, no auth). Historical depeg values sourced from incident records.

## Coverage of top 20

Covers stablecoins only. In the token matrix: 20 stablecoins tracked including USDT, USDC, USDS, DAI, GHO, USDE, and others.

## How to fetch

Current peg data from DeFiLlama:
- `GET https://stablecoins.llama.fi/stablecoins` — all stablecoins with current price
- `GET https://stablecoins.llama.fi/stablecoinprice/{id}` — historical price data

Historical max-depeg values are curated from known incident data and DeFiLlama price history.

## Open questions

- Max-depeg values require manual curation for new stablecoins.
- Consider automating historical max-depeg calculation from DeFiLlama price series.

## Sources

- https://stablecoins.llama.fi — DeFiLlama stablecoins API
- Historical depeg data from incident records

## Inclusion

Yes (already integrated). Provides a direct peg health signal for stablecoins. Complements Pharos stablecoin safety scores with raw peg deviation data.
