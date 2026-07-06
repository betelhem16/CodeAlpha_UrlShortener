# ADR 0002: Prisma Version and Generator Choice

**Status:** Accepted
**Date:** 2026-07-05

## Context
Prisma 7 (and recent 6.x releases) introduce `prisma.config.ts` and, for v7 specifically, mandatory driver adapters for SQLite. This adds setup complexity not aligned with this project's learning goals as a first Prisma project.

## Decision
Use Prisma 6.19.3 with the classic `prisma-client-js` generator (not the newer `prisma-client` generator), keeping the traditional `@prisma/client` import path.

## Reasoning
The classic generator matches the overwhelming majority of existing tutorials and community troubleshooting resources, reducing debugging friction. The newer generator's benefits (ESM-first, v7 alignment) don't outweigh this cost at this stage of learning.

## Consequences
- `prisma.config.ts` is still generated automatically (unavoidable as of Prisma 6.18+), but only handles minimal configuration; no driver adapter is required.
- A future migration to Prisma 7 will require revisiting this decision and adopting driver adapters.