---
name: ChainAware.ai
slug: chainaware
type: Data
focus: Rug pull safety scoring — deployer behavioral analysis and bytecode inspection for ERC-20 tokens
website: https://chainaware.ai
docs_url: https://chainaware.ai
fetch_method: api
api_base: https://swagger.chainaware.ai
auth_required: true
data_format: json
source_repo: n/a
access: paid
metric_orientation: ethereum-principles
is_rfp_suggestion: false
recommendation: include
last_researched: 2026-06-12
confidence: medium
---

## Overview

ChainAware.ai is a rug pull detection service that scores ERC-20 tokens on a 0-100 safety scale (higher = safer). It uses a dual-pipeline analysis: deployer behavioral history (wallet patterns, prior deployments) plus smart contract code inspection via AST parsing and bytecode analysis.

## Overall score

Yes. Per-token rug-score (0-100) where higher = safer. Based on deployer history and contract analysis.

## Data availability

Paid only. REST API at `https://swagger.chainaware.ai`. Requires API key (from profile). No free tier — Business or Enterprise subscription required.

## Coverage of top 20

Covers any ERC-20 token on Ethereum. In the token matrix: 30+ tokens assessed including DeFi governance tokens, stablecoins, and infrastructure tokens.

## How to fetch

REST API at `https://swagger.chainaware.ai`. Auth: API key from user profile. Query with token contract addresses. Returns a 0-100 safety score per token. Trained on 103k+ confirmed rug pulls.

## Open questions

- Paid API only — current data in the project may be from a trial or one-time fetch.
- Subscription pricing not publicly listed (Business/Enterprise tiers).

## Sources

- https://chainaware.ai — site and API

## Inclusion

Yes. Provides a unique rug-pull safety signal based on deployer behavioral analysis — a dimension not covered by other token security providers.
