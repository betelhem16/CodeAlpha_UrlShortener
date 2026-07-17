# CodeAlpha URL Shortener

A backend service that shortens long URLs into unique, randomly generated short codes. Built as part of the CodeAlpha Backend Development Internship (Task 1).

**Status:** Complete

## Features
- Shorten a long URL into a unique 7-character short code
- Redirect from a short code to its original URL
- Visit tracking (count + last visited timestamp)
- URL validation with scheme allow-listing (blocks `javascript:`, `data:`, and other unsafe schemes)
- Rate limiting on URL creation to prevent abuse
- Full test suite (unit + integration)

## Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express
- **Database:** SQLite
- **ORM:** Prisma (v6)
- **Testing:** Vitest + Supertest
- **Rate limiting:** express-rate-limit

## Project Structure
## Frontend

A React + TypeScript frontend lives in `client/`, built with Vite.

**Features:**
- Shorten URLs with real-time validation feedback
- Copy-to-clipboard for generated short URLs
- Persistent history (via localStorage)
- Per-link visit stats lookup
- Dark theme UI

### Frontend Setup
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`. Requires the backend running simultaneously on `http://localhost:3000` (CORS is configured to allow this specific origin).