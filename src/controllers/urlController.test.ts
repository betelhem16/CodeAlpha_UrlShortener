import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import urlRoutes from "../routes/urls";
import redirectRoutes from "../routes/redirect";

const app = express();
app.use(express.json());
app.use("/api", urlRoutes);
app.use("/", redirectRoutes);

describe("POST /api/shorten", () => {
  it("creates a short URL for a valid input", async () => {
    const response = await request(app)
      .post("/api/shorten")
      .send({ url: "https://example.com" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("shortCode");
    expect(response.body.longUrl).toBe("https://example.com");
  });

  it("rejects an invalid URL with 400", async () => {
    const response = await request(app)
      .post("/api/shorten")
      .send({ url: "not-a-url" });

    expect(response.status).toBe(400);
  });
});