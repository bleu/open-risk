---
name: Honeypot.is
slug: honeypotis
type: Data
focus: Honeypot detection — simulates buy/sell transactions to detect token trade restrictions and hidden taxes
website: https://honeypot.is
docs_url: https://honeypot.is
fetch_method: api
api_base: https://api.honeypot.is
auth_required: false
data_format: json
source_repo: n/a
access: free
metric_orientation: ethereum-principles
is_rfp_suggestion: false
recommendation: exclude
last_researched: 2026-06-12
confidence: high
---

## Overview

Honeypot.is detects honeypot tokens by simulating buy and sell transactions on-chain. It identifies tokens where users can buy but cannot sell (honeypots) and measures hidden buy/sell taxes that aren't visible in the contract source code.

## Overall score

No single score. Returns: safe (boolean — not a honeypot), buy-tax (%), sell-tax (%). A token is flagged unsafe if buy or sell transactions fail or have excessive hidden taxes.

## Data availability

Yes. Free API, no auth required.

## Coverage of top 20

Covers any ERC-20 token on Ethereum. In the token matrix: 30+ tokens assessed. However, all major tokens returned identical results (safe=1, 0% buy tax, 0% sell tax), providing no differentiating signal.

## How to fetch

REST API at `https://api.honeypot.is`.

Key endpoint:
- `GET /v2/IsHoneypot?address={token_address}&chainID=1`

Returns: honeypot status (boolean), simulated buy/sell tax percentages, and transaction simulation results.

Supports optional `X-API-KEY` header but not strictly required for basic use. No documented rate limits.

## Open questions

- Rate limits not documented — respect reasonable polling intervals.

## Sources

- https://honeypot.is — site and API

## Inclusion

No. Removed from the PoC. For the top tokens tracked in this project, Honeypot.is returned identical data across every token (safe=1, 0% buy/sell tax), adding no useful differentiation. The tool is designed to catch scam/rug tokens, which are not in scope for a top-20-by-mcap matrix. May be worth revisiting if coverage expands to long-tail tokens.
