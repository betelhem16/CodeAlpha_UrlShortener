# ADR 0004: Separate Frontend and Backend Dev Servers

**Status:** Accepted
**Date:** 2026-07-06

## Context
The optional frontend could be served as static files directly from Express (single server), or run as an independent Vite dev server communicating with Express over HTTP (two servers).

## Decision
Run the React frontend (Vite, port 5173) and Express backend (port 3000) as separate servers, communicating via CORS-permitted fetch requests.

## Reasoning
This matches standard industry full-stack architecture, where frontend and backend are developed and often deployed independently. It also provides direct, practical experience with CORS configuration, which is unavoidable in real full-stack roles.

## Consequences
- Requires explicit CORS configuration on the backend (`cors` middleware, origin allow-listed to the frontend's dev URL).
- Two terminals/processes needed for local development instead of one.
- Frontend hardcodes `http://localhost:3000` as the API base URL for now — would need an environment-variable-based config for a real deployment.