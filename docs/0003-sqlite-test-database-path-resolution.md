# ADR 0003: Absolute Path for Test Database

**Status:** Accepted
**Date:** 2026-07-05

## Context
Prisma has documented, inconsistent behavior when resolving relative SQLite paths in `DATABASE_URL` — the CLI resolves paths relative to `schema.prisma`'s location, while the generated client can resolve the same relative path differently depending on version and project structure. This caused test setup to fail with "Unable to open the database file" despite a seemingly correct relative path.

## Decision
Use an absolute, OS-normalized path (via Node's `path.resolve`, with backslashes converted to forward slashes) for the test `DATABASE_URL` in `vitest.config.ts`, instead of a relative path string.

## Reasoning
Removes the ambiguity entirely rather than guessing which relative-resolution behavior applies for a given Prisma version and setup.

## Consequences
- The test database path is computed in code rather than being a plain string — slightly less readable at a glance, but reliable across environments and Prisma versions.