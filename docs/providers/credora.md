---
name: Credora
slug: credora
type: Rating
focus: Institutional-grade credit risk ratings (A+ to D) for DeFi vaults and lending markets
website: https://www.credora.network/
docs_url: https://docs.redstone.finance/docs/redstone-credora/
fetch_method: api
api_base: https://api.credora.io/graphql
auth_required: true
data_format: json
source_repo: n/a
access: gated
metric_orientation: financial-market
is_rfp_suggestion: true
recommendation: conditional
last_researched: 2026-06-08
confidence: medium
---

## Overview

Credora (acquired by oracle network RedStone in Sept 2025) produces credit risk ratings (A+ through D) for DeFi vaults and lending markets, anchored to probability-of-default methodology. Ratings span three layers: asset quality, market mechanics, and vault/curator governance. Includes an expert consensus process (Credora Network) with contributors like Jump Crypto and GSR.

## Overall score

Yes. Per-vault letter grade (A+ to D) plus Probability of Significant Loss (PSL) and Probability of Default (PD). Grades map to implied traditional credit ratings.

## Data availability

No. The GraphQL API requires a whitelisted API key (`ClientSecret` header), issued via Google Form application. Dashboard and PDF reports also require special access. No publicly scrapable fallback.

## Coverage of top 20

2-3/20 confirmed: Morpho (+ Morpho Vaults, curator opt-in), Spark. Roadmap says "all major lending protocols" but Aave, Euler, Compound, Fluid are unconfirmed.

## How to fetch

GraphQL API at `https://api.credora.io/graphql`. Auth: `ClientSecret` header (whitelisted API key).

```graphql
query GetAllRatings {
  ratings(page: 0, limit: 10) {
    totalCount
    items {
      id address name protocol product
      ratingType  # "indicative" or "commissioned"
      curator { name }
      Metrics { rating psl publishDate }
    }
  }
}
```

Supports pagination and protocol/product/chain/curator filtering.

## Open questions

- Whether API access would be granted for this project.
- `commissioned` vs `indicative` ratings — commissioned ratings are protocol-paid, a potential bias to disclose.
- RedStone ownership is a conflict to declare (oracle provider with DeFi integrations).

## Sources

- https://www.credora.network/ — site
- https://docs.redstone.finance/docs/redstone-credora/ — docs
- https://docs.redstone.finance/docs/redstone-credora/api-documentation — API docs
- https://reports.credora.io/spark/latest.pdf — example Spark risk report

## Inclusion

Conditional. Provides genuine credit-risk ratings with unique PD/PSL methodology. Condition: requires Credora to grant API access for this project. Gated nature and RedStone ownership must be disclosed.
