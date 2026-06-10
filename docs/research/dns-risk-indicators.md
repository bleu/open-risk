# DNS Risk Indicators Research

**Date:** 2026-06-10

## Context

DNS hijacking, frontend injection, and supply chain compromise accounted for ~57% of all DeFi breaches and ~80% of stolen funds in 2024. The July 2024 Squarespace DNS hijacking campaign alone put 228+ DeFi protocol frontends at risk.

We investigated what tools exist for assessing DNS risk — not just "is the DNS healthy right now?" (point-in-time detection) but "how likely is this domain's DNS to be attacked?" (predictive risk posture over time).

## Key Distinction

Most existing tools fall into one of two categories:

- **Reactive/detection** — detects active attacks or compromises in real-time
- **Posture/predictive** — assesses the security configuration and attack surface to predict likelihood of future attack

Most DeFi-focused tools are reactive. The predictive space is where the gap is.

## Tools Evaluated

### DNS Configuration Scoring (Posture)

| Tool | Longitudinal | Scoring | API | Free Tier | Notes |
|------|-------------|---------|-----|-----------|-------|
| **nslookup.io** | No (point-in-time) | 0-100, 39 checks, 7 categories | Yes (free, no key) | Yes | **Currently integrated.** Returns structured JSON with overall + category scores (DNSSEC, CAA, TTL, MX, Hygiene, NS Config, Operations). Can be polled to build longitudinal data. |
| **DomainRisk.io** | Yes (timeline) | 0-100 weighted (WHOIS 30%, DNS 25%, SSL 25%, Email 20%) | Webhooks | Yes | Compares each scan to previous snapshot, logs DNS record changes and score drifts. Auditable timeline. |
| **Hardenize** | Yes (grade history) | A-F | Yes | No ($5K+/yr) | Tracks DNS/TLS config over time. Alerts on grade drops. Enterprise pricing. |
| **DNSMonit** | Yes (score history) | A-F, 100-point scale | Webhooks (Slack/Discord) | Limited | Checks every 15 min. DNS Basics (40pts), Security (35pts), Email Security (25pts). |
| **Akamai DNS Posture Management** | Yes (continuous) | Yes | Likely | No | Launched June 2025. Continuous monitoring for misconfigs, DNS drift, unauthorized changes. Multi-cloud. Enterprise-grade. |
| **SecurityScorecard** | Yes | A-F across 10 factors incl. DNS Health | Yes | Limited | Third-party vendor risk management oriented. Validates SPF/DKIM/DMARC, passive DNS history. |

### Historical DNS Data (Raw Data, Build Your Own Signals)

| Tool | Data | API | Notes |
|------|------|-----|-------|
| **SecurityTrails** (now Recorded Future) | 10T+ DNS lookups since 2008. All record types, WHOIS history. | Yes (REST) | Excellent for building custom signals: "how often did nameservers change?", "did the registrar change recently?" No built-in risk score — you build the scoring logic. |
| **Farsight DNSDB** (now DomainTools) | 100B+ passive DNS records since 2010. 2TB/day ingestion. | Yes (REST, also on-premise) | World's largest passive DNS database. Has ML-based 0-100 risk score with Proximity, Malware, Phishing, Spam sub-scores. |

### Domain Reputation Scoring (Threat Proximity)

| Tool | What It Scores | API | Notes |
|------|---------------|-----|-------|
| **DomainTools** | Predictive domain risk. Sub-scores: Proximity, Malware Risk, Phishing Risk, Spam Risk. | Yes (Real-Time Threat Feeds) | Predicts if a domain is likely malicious. Better for detecting lookalike/phishing domains targeting a protocol than scoring the protocol's own posture. Enterprise pricing. |
| **Microsoft Defender Threat Intelligence (MDTI)** (formerly RiskIQ) | 0-100 reputation score for domains/IPs. | Yes | Good for detecting if a domain has become associated with malicious activity. Free tier available (limited). |

### DeFi-Specific (Mostly Reactive)

| Tool | What It Does | API | Predictive? |
|------|-------------|-----|-------------|
| **Blockaid** | Malicious dApp detection at wallet connection. Internet-wide security agents monitor DNS registrations, phishing domains. | Yes (used by MetaMask, Coinbase Wallet) | No — reactive, but early detection (detected Aerodrome/Velodrome DNS attack 36 min before public report) |
| **Hypernative Frontend Monitoring** | Simulates user interactions with Web3 apps, detects deviations indicating attack. | Yes (API + SDK) | No — detects active attacks via behavioral deviation |
| **DomainSure** | Crypto/DeFi domain security. Auto DNSSEC, threat feeds of phishing/clone sites. ML typosquatting detection. | Threat feeds | Partial — managed service, closer to posture but not a scoring API |
| **Forta Scam Detector** | Decentralized monitoring for real-time threat detection. | GraphQL API | No — primarily on-chain focused |

### Certificate & Domain Monitoring (Early Warning Signals)

| Tool | What It Does | Access | Notes |
|------|-------------|--------|-------|
| **crt.sh** (Certificate Transparency) | Monitors CT logs for new certificate issuance for a domain. | Free | Early warning — if someone gets a new cert for your domain, something is wrong. Can detect hijacks before they're operationalized. |
| **Domain lookalike tracking** | Detects registration of similar/typosquatting domains. | Varies | Threat proximity signal — more lookalikes being registered = higher risk of phishing campaign. |

## The Gap

No single tool provides a **longitudinal DNS attack-surface score for DeFi protocols** that combines:

1. **Configuration quality** — DNSSEC, CAA, registry lock, registrar security
2. **Infrastructure risk** — registrar reputation (e.g., Squarespace registrar = high risk), nameserver diversity
3. **Historical stability** — frequency of DNS changes, registrar transfers
4. **Threat proximity** — lookalike domains, active phishing campaigns targeting the domain

## Current Integration

We integrated **nslookup.io** as a first step because:
- Free API, no key required
- Returns structured JSON with granular category scores
- Covers the configuration quality dimension well
- Can be polled periodically to build longitudinal data

Metrics exposed: **Score** (overall), **DNSSEC**, **CAA**, **TTL**

## Potential Next Steps

- **DomainRisk.io** — adds longitudinal tracking with WHOIS + SSL + email posture
- **SecurityTrails** — historical DNS change frequency as a stability/volatility signal
- **crt.sh** — certificate transparency anomalies as an early warning signal
- Build a composite score weighting these inputs for DeFi-specific risk factors (e.g., penalize known-vulnerable registrars, reward registry lock + DNSSEC + CAA)
