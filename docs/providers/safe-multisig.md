---
name: Safe Multisig
slug: safe-multisig
type: Data
focus: Gnosis Safe multisig configuration — signer threshold and owner count for protocol governance
website: https://safe.global
docs_url: https://docs.safe.global/core-api/transaction-service-reference
fetch_method: api
api_base: https://safe-transaction-mainnet.safe.global/api/v1
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

The Safe Transaction Service API provides on-chain multisig configuration data for protocols that use Gnosis Safe for governance or emergency operations. This project queries it to surface the signer threshold (e.g., "3/5" means 3 of 5 signers required) — a direct measure of admin key concentration and governance decentralization.

## Overall score

No overall score. Returns the threshold/owners ratio (e.g., "5/9") per Safe address — displayed as a governance decentralization signal.

## Data availability

Yes. Free public API, no auth required. Rate limit: 2 requests/second (unauthenticated).

## Coverage of top 20

6/20 (protocols with known Safe multisigs on mainnet): Spark (3/5), Aave (5/9), Morpho (5/9), Curve (5/9), Pendle (3/5), Lido (3/6). The remaining protocols either use non-Safe governance (Governor Bravo, timelocks), are fully immutable (Liquity), or have no known Safe address.

## How to fetch

REST API. Query: `GET https://safe-transaction-mainnet.safe.global/api/v1/safes/{address}/`

Returns:
- `threshold`: number of required signers
- `owners`: array of signer addresses (count = total signers)
- `version`: Safe contract version
- `nonce`, `modules`: supplementary config

The fetcher (`src/providers/safe-multisig.ts`) maintains a map of protocol ID to Safe address, queries each, and outputs the "M/N" threshold display.

## Open questions

- Safe addresses need manual curation — new protocols or governance changes require updating the address map.
- Some protocols have multiple Safes (emergency DAO, treasury, etc.) — currently only one is tracked per protocol.

## Sources

- https://safe.global — Safe (formerly Gnosis Safe)
- https://docs.safe.global/core-api/transaction-service-reference — API reference

## Inclusion

Yes. Adds a direct governance decentralization signal (signer threshold) that complements DeFiScan's qualitative admin-control assessments.
