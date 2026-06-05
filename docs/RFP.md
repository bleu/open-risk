# RFP: Neutral DeFi Risk Intelligence Aggregator

**Request for Proposals**
Ethereum Foundation, App Relations | May 26, 2026 | **Deadline: June 15, 2026**

---

## 1. Problem and What We Are Looking For

DeFi risk intelligence is fragmented. Before deploying capital, users ranging from retail participants to institutional asset managers must navigate dozens of dashboards, rating services, and data providers. The information exists but there is no neutral layer that aggregates it into one place.

A growing ecosystem of risk frameworks and analytics dashboards (aka feeds) has emerged: BlockAnalitica, DeFiScan, DeFiPunk'd, CuratorWatch, Pharos, Credora, and others. Each has its own focus and methodology. The right mental model is **oracle diversity**: no single feed should be canonical for something this important. The aggregation is the value.

The Ethereum Foundation App Relations team ran sessions with 70+ DeFi protocol teams at EthCC 2026, paired with many additional live remote connections throughout the year. A neutral, unified risk reference was one of the most consistently raised gaps.

This RFP seeks a team to build that aggregation layer as a **public good**: a neutral, open source web application that shows what every major risk feed says about a protocol, side by side, without synthesis or scoring.

### Deliverables

- A production web application covering the top 20 DeFi protocols by funds at risk (TVL), showing feed coverage status, governance data, and what each provider says verbatim
- Every cell in the protocol-by-feed matrix is assessed and labeled. Coverage status (covered, partial, or not yet covered) shown explicitly for each protocol against each feed in the registry.
- An open, community-correctable data layer with documented process for corrections, new protocols, and new feed providers
- A methodology page explaining the aggregation approach, the feed registry, and data provenance
- A named steward confirmed before final payment: a specific individual or organization with public presence and long-term incentive to maintain the project

### Design Principle on Scoring

**Composite scoring is out of scope.** The project presents existing feed data without synthesis or editorial judgment. Any future addition of composite scoring requires written agreement from the Ethereum Foundation. This must be documented in a project charter committed to the repository.

### Proof of Concept

The EF App Relations team has built a working POC and full technical specification illustrating the vision. The POC is a design reference, not a production target. Protocol coverage, feed providers, and data shown are illustrative. Applicants are not expected to build on this codebase; they are expected to build something better. Shortlisted applicants will receive GitHub access, and screenshots can be found in the Appendix.

---

## 2. Requirements

Hard requirements must be met to be considered. Soft requirements are nice to have and will weigh in scoring.

| Requirement | Detail | Type |
|---|---|---|
| Open source | Full codebase and data layer AGPL 3.0 licensed and publicly available on GitHub | Hard |
| Ethereum-native | Primary focus on Ethereum mainnet protocols. Cross-chain out of scope for v1. | Hard |
| No composite scoring | Must not produce its own risk scores or composite assessments. Feed ratings shown verbatim only. | Hard |
| Neutral positioning | No undisclosed commercial relationships with listed protocols. All conflicts must be declared. | Hard |
| Top 20 coverage | All 20 seed protocols in Section 3 populated at launch | Hard |
| Live TVL/Volume | TVL or equivalent volume metric where TVL is not applicable | Hard |
| Named steward | Named individual or org confirmed as long-term steward before final payment | Hard |
| Team track record | At least one team member with shipped production DeFi tooling or data infrastructure | Hard |
| Feed relationships | Active relationships with listed providers that could accelerate data quality or automation | Soft |
| Feed automation | Coverage automated where providers expose data publicly, rather than manually curated | Soft |
| Governance data | Governance data sourced from onchain or verifiable sources rather than solely self-reported | Soft |
| Design quality | Legible, data-dense interface. Reference points: L2Beat, Walletbeat, DeFiScan. | Soft |
| Public goods track record | Prior contributions to Ethereum public goods, open source tooling, or ecosystem infrastructure | Soft |

---

## 3. Seed Protocol List

Top 20 Ethereum-ecosystem DeFi protocols by TVL or equivalent volume where TVL is not applicable, prioritizing protocols where user capital is directly at risk. Applicants should verify rankings against DefiLlama at time of build.

| Protocol | Category | Notes |
|---|---|---|
| Spark | Lending | Sky sub-protocol. SparkLend and sUSDS. |
| Aave | Lending | Include v3 and v4. |
| Morpho | Lending | Core lending protocol. See also Morpho Vaults under Yield. |
| Fluid | Lending | Lending and DEX hybrid. |
| Gearbox | Lending | Credit account leverage protocol. |
| Euler | Lending | Modular vault lending. |
| Compound | Lending | Include v2 and v3. |
| Liquity | Lending | Include v1 and v2. Immutable CDP protocol. |
| Uniswap | DEX / AMM | Include v3, v4, and UniswapX. |
| Curve | DEX / AMM | Stablecoin and LST AMM infrastructure. |
| Balancer | DEX / AMM | Weighted and stable pools. |
| CoW Swap | Swap Aggregator | Intent-based DEX with MEV protection. |
| 1inch | Swap Aggregator | DEX aggregator and limit order protocol. |
| 0x / Matcha | Swap Aggregator | 0x protocol and Matcha frontend. |
| Yearn Finance | Yield / Vault | Automated yield vaults. |
| Mellow | Yield / Vault | Modular LRT vault infrastructure. |
| Morpho Vaults | Yield / Vault | Curated MetaMorpho vaults. |
| Pendle | Yield / Vault | Yield tokenization and fixed-rate trading. |
| Lido | Liquid Staking | Largest ETH staking protocol. stETH is the most widely used DeFi collateral and yield source. |
| Rocket Pool | Liquid Staking | Decentralized ETH staking. rETH. |

---

## 4. Risk Feed Registry

The list below is illustrative, not prescriptive. Applicants propose the final feed registry as part of the submission, with brief rationale for inclusions and exclusions. Strong proposals cover most of these providers and add others to maximize diversity of coverage methodologies.

| Provider | Focus | Type |
|---|---|---|
| DeFiScan | Decentralization maturity framework: who controls keys, upgrades, and admin powers | Rating |
| CuratorWatch | Vault-level risk monitoring for Morpho curators, tracking allocation risk and curator behavior | Dashboard |
| BlockAnalitica | Quantitative on-chain risk dashboards for lending markets: liquidations, collateral health, market exposure | Dashboard |
| DeFiPunk'd | Multi-dimension risk registry: Control, Exit, Autonomy, Open Access, Verifiability via distributed LLM consensus | Rating |
| Pharos | Real-time risk monitoring and automated alerts for live protocol risk events | Monitoring |
| DeFi Sphere | Multi-dimensional protocol analysis covering technical, financial, and operational risk | Rating |
| DeFi Saver | Live loan health and liquidation statistics for leveraged DeFi positions | Dashboard |
| Credora | Institutional-grade credit risk ratings for DeFi protocols and borrowers | Rating |
| RiskLayer | Economic security middleware built on EigenLayer. Proof of Risk consensus for decentralized, validator-attested risk scores. | Rating |
| pigi.finance | Vault analytics and risk-adjusted yield comparison across 50+ protocols. Tracks historical exploits, holder concentration, and risk-adjusted APY. | Dashboard |
| Xerberus | Independent risk rating protocol for DeFi vaults. 300+ subscores across 85+ mechanisms. Investor-focused and open-source. | Rating |
| Zyfai Risk | Real-time risk score dashboard for DeFi liquidity pools. Tracks risk metrics, TVL, APY, and security grades across pools. | Dashboard |
| LlamaRisk | Protocol risk research and parameter recommendations for DeFi. Analytics and monitoring focused on collateral and governance risk. | Research |
| Philidor Analytics | Deterministic vault risk scoring across 700+ vaults. Three-vector framework: asset quality, platform code maturity, and governance controls. Open methodology. | Rating |

---

## 5. Budget, Benefits, and Milestones

### Funding

The Ethereum Foundation anticipates allocating up to **$15,000** for this grant. Total funding may increase beyond the base allocation, with the EF App Relations team working alongside the grantee to secure matching contributions from leading DeFi protocols and infrastructure teams. L2 coverage is out of scope for this grant but may be added as a follow-on milestone if matching funding is secured from L2 ecosystem teams.

Proposals should include a budget breakdown covering engineering, design, data curation, infrastructure, and ongoing maintenance.

### Grant Benefits Beyond Funding

This grant comes with material non-financial benefits:

- EF App Relations social amplification at announcement and throughout the project's development
- Direct introductions to DeFi protocol teams, risk feed providers, and institutional partners
- Access to the EF App Relations team as ongoing advisors

### Milestone Schedule

Funding is structured as a three-part allocation: 33% upfront, 33% upon completion of M1, and the final tranche following M2 delivery. All deliverables are subject to evaluation by the EF App Relations team prior to any fund release.

| Milestone | Deliverable | Payment |
|---|---|---|
| **Grant Activation** | Upfront allocation upon execution of the countersigned grant agreement. No specific technical deliverables required. | 33% upfront |
| **M1 - Week 12** | Production application deployed at a stable public URL. Public GitHub repository under AGPL 3.0, in place and developed in the open since project start, with a documented contribution and correction process in the README. All 20 seed protocols are populated, each with a dedicated detail page. Live TVL, or equivalent volume metric where TVL is not applicable, across all seed protocols, sourced from DefiLlama. Governance data surfaced for all seed protocols. Every cell in the protocol-by-feed matrix is assessed and labeled. Coverage status (covered, partial, or not yet covered) shown explicitly for each protocol against each feed in the registry. Methodology page live, documenting the feed registry and data provenance tags. | 33% upon Milestone 1 completion |
| **M2 - Week 20** | Feed coverage is automated wherever providers expose data publicly. Manual curation reserved for feeds without machine-readable outputs. A short roadmap outlining how protocol coverage expands beyond the initial 20 over time. Community contribution model demonstrably operational: at least one round of external corrections accepted and merged, with the workflow proven end to end. Project charter committed to the repository, defining the no-composite-scoring constraint and the process required to ever change it. Named steward confirmed in writing. The steward is a specific individual or organization with public presence and a stated commitment to long-term maintenance. | 34% upon Milestone 2 completion |

The EF reserves the right to not approve payment after review of the deliverables.

---

## 6. Submission

Submissions close **June 15 AoE, 2026**. Apply via the application form and include artifacts listed below.

| Artifact | Detail |
|---|---|
| Proposal document | Maximum 5 pages. Cover: approach, milestone timeline, and budget breakdown. |
| Prior work | Links to 1-3 examples of relevant shipped work |
| Team information | Names, GitHub handles, and relevant experience for all core contributors |
| Conflict disclosures | Any commercial relationships with protocols listed in Section 3 or feed providers listed in Section 4 |
| Stewardship plan | Who will own and maintain the project after the grant period and why they are incentivized to do so |
| Prototype or mockup | Optional but weighted positively |

---

## Appendix: Proof of Concept Screenshots

Illustrative examples of the vision. Protocol coverage, feed providers, and data shown are not representative of final scope. Shortlisted applicants will receive GitHub access to the underlying codebase.

**Summary Table** — All protocols in a sortable, filterable table. One column per risk feed. Family grouping for versioned protocols. Live TVL from DefiLlama.

**Protocol Detail Page** — Per-protocol page showing governance data with provenance tags, feed cards with methodology one-liners and verbatim ratings, audit history, and incident history.

**Methodology Page** — Methodology page explaining what the project does and does not do, the full feed registry with one-liners, and data provenance tags.

---

*The Ethereum Foundation reserves the right to fund none, one, or multiple proposals, to negotiate scope, and to request revisions before award. This RFP does not constitute a commitment to fund. A public good initiative of the Ethereum Foundation App Relations team.*
