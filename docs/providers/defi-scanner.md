---
name: De.Fi Scanner
slug: defi-scanner
type: Data
focus: Token contract security scanning — risk level assessment for ERC-20 tokens
website: https://de.fi
docs_url: https://docs.de.fi
fetch_method: api
api_base: https://public-api.de.fi/graphql
auth_required: true
data_format: json
source_repo: n/a
access: freemium
metric_orientation: ethereum-principles
is_rfp_suggestion: false
recommendation: include
last_researched: 2026-06-12
confidence: high
---

## Overview

De.Fi Scanner is a smart contract security scanner that assesses ERC-20 token risk levels (Low/Medium/High) by analyzing contract code, governance patterns, and known vulnerabilities. Part of the De.Fi platform which also maintains a REKT Database of 2,500+ exploit incidents.

## Overall score

Yes. Per-token risk level: Low, Medium, or High. The `scannerProject` endpoint also returns detailed security issues and a security score.

## Data availability

Credit-based. GraphQL API at `https://public-api.de.fi/graphql`. Requires API key via `X-Api-Key` header (sign up at https://de.fi/api). Rate limit: 100 req/min. Costs credits per query (3 credits for `rekts`, 25 for `scannerProject`). Credits must be purchased.

## Coverage of top 20

Covers any ERC-20 token on Ethereum. In the token matrix: 30+ tokens assessed across DeFi, stablecoins, infrastructure, and exchange categories.

## How to fetch

GraphQL at `https://public-api.de.fi/graphql`. Auth: `X-Api-Key` header.

The `scannerProject` query (25 credits/call) returns issues, security score, and governance info per token contract. Used in this project to produce a Low/Medium/High risk classification per token.

## Open questions

- Credit-based pricing — confirm free tier limits are sufficient for ongoing automation.

## Sources

- https://de.fi — site
- https://de.fi/rekt-database — exploit database
- https://docs.de.fi — API documentation

## Inclusion

Yes. Provides token-level contract risk assessment via free API. Also valuable for its REKT Database (2,500+ exploit incidents with per-protocol filtering).
