# Provider display buckets

Not every provider with fetched data belongs in the matrix. Providers are classified into three buckets based on their data shape:

1. **Single metric** — the provider produces one top-level evaluation per protocol (e.g., DeFiScan's stage). Gets one column.
2. **Multiple metrics** — the provider produces a list of named evaluations per protocol with no single aggregate (e.g., DeFiPunk'd's five slices). Gets subcolumns, one per metric.
3. **Skip** — the provider's data is too granular (vault-level, market-level) or lacks a protocol-level risk assessment. Not displayed in the matrix; documented with reasoning.

We chose this over flattening complex provider data into the matrix because the RFP requires verbatim feed ratings. Inventing a "protocol score" from vault-level or market-level data would be synthesis — exactly what the RFP forbids. Skipped providers (BlockAnalitica, Philidor) have fetched data that may become displayable if those providers publish protocol-level assessments in the future.
