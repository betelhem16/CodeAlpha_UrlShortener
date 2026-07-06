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