---
name: DeFiLlama
slug: defillama
type: Data
focus: Protocol metadata — TVL, audit status, hack history, and fees across all DeFi
website: https://defillama.com
docs_url: https://defillama.com/docs/api
fetch_method: api
api_base: https://api.llama.fi
auth_required: false
data_format: json
source_repo: https://github.com/DefiLlama
access: free
metric_orientation: financial-market
is_rfp_suggestion: false
recommendation: include
last_researched: 2026-06-12
confidence: high
---

## Overview

DeFiLlama is the largest open DeFi analytics aggregator, tracking TVL, fees, revenue, hacks, and audit status across thousands of protocols. It serves as the baseline metadata layer for this project — not a risk rating provider, but the canonical source for protocol fundamentals.

## Overall score

No. DeFiLlama does not produce risk scores. It provides raw metrics: TVL (with 7d change), audit status (boolean), hack count, and hack loss (USD).

## Data availability

Yes. Fully free, open-source, no auth required. REST API with comprehensive endpoints.

## Coverage of top 20

20/20. All seed protocols are indexed in DeFiLlama.

## How to fetch

REST API at `https://api.llama.fi`. No auth.

Endpoints used by this project:
- `GET /protocols` — all protocols with TVL, change_7d, audit status, audit links
- `GET /hacks` — all DeFi hacks with protocol name, amount, date, classification
- `GET /overview/fees` — fee/revenue data per protocol

The fetcher (`src/providers/defillama.ts`) matches our protocol IDs to DeFiLlama slugs, aggregates hacks across protocol versions (same parent), and outputs per-protocol JSON.

Metrics extracted per protocol:
- `tvl-delta`: 7-day TVL change (%)
- `audited`: whether the protocol has audits (boolean)
- `hacks`: count of historical hack events
- `hack-loss`: total USD lost to hacks

## Open questions

- None significant. API is stable and well-documented.

## Sources

- https://defillama.com — site
- https://defillama.com/docs/api — API docs
- https://github.com/DefiLlama — open-source repos

## Multi-entity usage

Also used as an **oracle-level provider** in the oracle matrix. Provides TVS (Total Value Secured) weekly delta per oracle network. Data from the same `/protocols` endpoint filtered for oracle-type entries. Covers: Chainlink, Chronicle, WINkLink, RedStone, Pyth.

## Inclusion

Yes (already integrated). Not an RFP-suggested risk provider — serves as the baseline metadata layer for protocol fundamentals (TVL, audits, hacks) and oracle TVS tracking.
