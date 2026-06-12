---
name: Zyfai Risk
slug: zyfai
type: Dashboard
focus: Pool risk scores and stability metrics for DeFi lending/yield pools
website: https://risk.zyf.ai/
docs_url: https://docs.zyf.ai/
fetch_method: api
api_base: https://defiapi.zyf.ai/api/v2
auth_required: true
data_format: json
source_repo: https://github.com/ondefy/zyfai-sdk
access: free
metric_orientation: financial-market
recommendation: exclude
last_researched: 2026-06-08
confidence: high
---

## Overview

Zyfai Risk is a pool risk-score dashboard operated by Zyfai, an automated yield agent. It grades pools (A-F) on risk while showing TVL, APY, and stability metrics. The dashboard exists to surface pools Zyfai's own quant team assesses for rebalancing.

## Overall score

Yes on dashboard (A-F per pool), but the letter grades are NOT exposed via the API. The API provides underlying stability flags and health metrics only.

## Data availability

SDK/API exists (`@zyfai/sdk`) with stability metrics per pool. However, the A-F risk grades — the main actionable indicator — are only visible on the SPA dashboard, not in the API. API requires `x-sdk-key` header.

## Coverage of top 20

~6/20 on Ethereum mainnet: Aave, Compound V3, Fluid, Morpho Vaults, Spark, Yearn. Also Euler, but via aggressive strategies only.

## How to fetch

SDK: `@zyfai/sdk` (TypeScript). Auth: `x-sdk-key` header.

Key endpoints:
- `GET https://defiapi.zyf.ai/api/v2/opportunities/safe?chainId=1` — conservative pools with stability metrics
- `GET https://defiapi.zyf.ai/api/v2/opportunities/degen-strategies?chainId=1` — aggressive pools

Returns: TVL, APY, stability flags (isTvlStable, isApyStable7/10/15/30Days), collateralHealth.isHealthy, IRM parameters, vault allocations.

## Open questions

- A-F grades not in API — only underlying metrics available programmatically.
- Zyfai is a yield agent, not an independent rater — advisory ties to Aave (Marc Zeller).

## Sources

- https://risk.zyf.ai/ — dashboard
- https://github.com/ondefy/zyfai-sdk — SDK
- https://docs.zyf.ai/ — docs

## Inclusion

No. The A-F risk grades (the main actionable indicator) are not available via the API. The underlying stability metrics are useful but not structured as actionable risk indicators for the aggregator.
