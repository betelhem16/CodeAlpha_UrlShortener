// new file: src/middleware/rateLimiter.test.ts

import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import urlRoutes from "../routes/urls";

const app = express();
app.use(express.json());
app.use("/api", urlRoutes);

describe("shorten rate limiter", () => {
  it("blocks requests after exceeding the limit", async () => {
    for (let i = 0; i < 20; i++) {
      await request(app)
        .post("/api/shorten")
        .send({ url: `https://example.com/${i}` });
    }

    const response = await request(app)
      .post("/api/shorten")
      .send({ url: "https://example.com/final" });

    expect(response.status).toBe(429);
  });
});