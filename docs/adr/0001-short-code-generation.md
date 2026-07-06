# ADR 0001: Short Code Generation Strategy

**Status:** Accepted
**Date:** 2026-07-03

## Context
Needed a way to generate short codes for submitted URLs. Considered three approaches:
1. Base62-encoded auto-increment ID
2. Random string + collision check
3. Hash of the URL (truncated)

## Decision
Use random 7-character alphanumeric strings, with a database uniqueness check and retry on collision (max 5 attempts).

## Reasoning
- Option 1 (sequential IDs) makes short codes enumerable — an attacker could scrape `/1`, `/2`, `/3`... and discover every stored URL. Rejected on security grounds.
- Option 3 (hash-based) forces "same URL → same code" behavior, conflicting with the decision to allow multiple short codes per URL. Truncated hashes also have non-trivial collision probability anyway, negating their main advantage.
- Option 2 avoids enumeration, doesn't lock in code reuse, and matches how most production URL shorteners behave.

## Consequences
- Requires a database uniqueness check on generation (small perf cost, mitigated by a unique index on `shortCode`).
- Must handle the collision-retry path explicitly, including a capped retry limit that fails loudly rather than looping forever.