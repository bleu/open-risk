---
name: GoPlus
slug: goplus
type: Data
focus: Token security analysis — source verification, honeypot detection, proxy status
website: https://gopluslabs.io
docs_url: https://docs.gopluslabs.io
fetch_method: api
api_base: https://api.gopluslabs.io/api/v1
auth_required: false
data_format: json
source_repo: n/a
access: free
metric_orientation: ethereum-principles
is_rfp_suggestion: false
recommendation: include
last_researched: 2026-06-12
confidence: high
---

## Overview

GoPlus Security is a token security API that checks whether a governance token's contract source code is verified (open source), whether it is a proxy contract, and whether it exhibits honeypot behavior (buy/sell restrictions). Used in this project to provide a basic token-level safety check per protocol.

## Overall score

No overall score. Returns binary flags per token: source verified (yes/no), is honeypot (yes/no), plus supplementary data (proxy status, buy/sell tax, holder count).

## Data availability

Yes. Free public API, no auth required. Rate limit ~10 req/min on free tier.

## Coverage of top 20

17/20. Covers all protocols with a governance token on Ethereum mainnet. Excluded: Spark (no token), Mellow (no token), Morpho Vaults (uses Morpho token).

## How to fetch

REST API. Query: `GET https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses={address}`

Where `1` is Ethereum mainnet chain ID.

Returns per token:
- `is_open_source`: "1" if source code verified on Etherscan
- `is_honeypot`: "1" if buy/sell restricted
- `is_proxy`: "1" if proxy contract
- `buy_tax`, `sell_tax`: tax percentages
- `holder_count`: number of holders
- `token_name`, `token_symbol`

The fetcher (`src/providers/goplus.ts`) maps each protocol to its governance token address and queries individually with 6s delays to respect rate limits.

## Open questions

- Free tier rate limits (~10 req/min) require sequential fetching with delays.
- Token addresses need manual maintenance when protocols launch new tokens.

## Sources

- https://gopluslabs.io — site
- https://docs.gopluslabs.io — API docs

## Multi-entity usage

Also used as a **token-level provider** in the token matrix (slug: `goplus-token`) with expanded metrics: verified (source code open), safe (not honeypot), fixed-supply (cannot mint), immutable (no proxy). Covers 30+ tokens across DeFi, stablecoins, infrastructure, and exchange categories.

## Inclusion

Yes. Adds basic token contract safety checks (source verification, honeypot detection) as a supplementary data layer.
