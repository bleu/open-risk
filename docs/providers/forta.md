---
name: Forta Network
slug: forta
type: Monitoring
focus: Decentralized threat detection — security alerts and risk levels for oracle networks
website: https://forta.org
docs_url: https://docs.forta.network
fetch_method: api
api_base: https://api.forta.network
auth_required: true
data_format: json
source_repo: https://github.com/forta-network
access: freemium
metric_orientation: financial-market
is_rfp_suggestion: false
recommendation: include
last_researched: 2026-06-12
confidence: high
---

## Overview

Forta Network is a decentralized threat detection network that monitors blockchain activity in real-time via community-built detection bots. It produces security alerts for suspicious transactions, exploits, governance attacks, and oracle manipulation attempts. For the oracle matrix, we track alert counts and risk levels per oracle network.

## Overall score

No single score. Per-oracle: alerts-30d (count of security alerts in last 30 days) and risk-level (Low/Medium/High based on alert severity and frequency).

## Data availability

GraphQL API at `https://api.forta.network/graphql`. Requires Bearer token auth (`Authorization: Bearer <key>`). Paid plan required for API access. Public alerts explorer at app.forta.network is free to browse.

## Coverage of top 5 oracles

5/5: Chainlink (2 alerts/30d, Low), Chronicle (0, Low), WINkLink (5, Medium), RedStone (1, Low), Pyth (1, Low).

## How to fetch

GraphQL API at `https://api.forta.network`. Auth: API key required (free tier).

Query alerts filtered by oracle-related bot IDs and target addresses. Aggregate alert count and derive risk level from severity distribution over 30-day windows.

## Open questions

- Free tier rate limits and alert query depth need confirmation.
- Bot coverage varies — some oracles may have fewer detection bots monitoring them.

## Sources

- https://forta.org — site
- https://docs.forta.network — API documentation
- https://app.forta.network — alert explorer
- https://github.com/forta-network — open-source repos

## Inclusion

Yes. Provides real-time threat monitoring signals for oracle networks — a unique operational security dimension. The only provider offering live alert data for oracle manipulation detection.
