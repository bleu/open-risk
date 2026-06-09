# Open Risk

A neutral, public-good web app that shows what every major DeFi risk feed says about a protocol, side-by-side, without synthesis or composite scoring.

## Language

### Actors & entities

**Protocol**:
A specific version of a DeFi application deployed on Ethereum mainnet. Versioned separately — Aave V2 and Aave V3 are distinct protocols.
_Avoid_: project, dApp, platform

**Seed Protocol**:
One of the 20 protocols defined in the RFP that must be covered at launch.
_Avoid_: default protocol, core protocol

**Provider**:
An organization that publishes risk assessments for DeFi protocols. Each provider has its own rating methodology and scale.
_Avoid_: feed, rater, assessor, analyst

**Canonical Protocol Registry**:
The editorial mapping that resolves a protocol's identity across providers. Maps each provider's slug to a single canonical protocol entry.
_Avoid_: protocol index, slug map

### Ratings & display

**Evaluation**:
A single provider's assessment of a single protocol on Ethereum. Always displayed verbatim in the provider's native scale — never normalized or synthesized.
_Avoid_: score, rating, grade (when used generically across providers)

**Feed Count**:
The number of providers that have at least one visible, non-null evaluation for a protocol in the matrix.
_Avoid_: coverage count, provider count

**Metric**:
A named dimension within a provider's evaluation. A provider with a single metric produces one column; a provider with multiple metrics produces subcolumns.
_Avoid_: dimension, slice, category

### Protocol classification

**Protocol Type**:
One of five fixed categories from the RFP: `lending`, `dex-amm`, `swap-aggregator`, `yield-vault`, `liquid-staking`.
_Avoid_: category, sector, vertical

### Views

**Matrix**:
The primary data table. Rows are seed protocols, left columns are protocol metadata (name, type, TVL, feed count), right columns are provider evaluations.
_Avoid_: grid, table, dashboard

**Type Filter**:
A tab bar that restricts the matrix to protocols of a single type. Providers with all-null evaluations for the filtered type are hidden.
_Avoid_: category view, type mode, summary view
