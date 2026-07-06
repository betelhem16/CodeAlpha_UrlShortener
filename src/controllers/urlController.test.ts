import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import urlRoutes from "../routes/urls";
import redirectRoutes from "../routes/redirect";
import prisma from "../models/prismaClient";
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

describe("GET /:shortCode", () => {
  it("redirects to the original URL and increments visit count", async () => {
    const created = await prisma.url.create({
      data: { shortCode: "test123", longUrl: "https://example.com" },
    });

    const response = await request(app).get(`/${created.shortCode}`);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("https://example.com");

    const updated = await prisma.url.findUnique({
      where: { shortCode: "test123" },
    });

    expect(updated?.visitCount).toBe(1);
    expect(updated?.lastVisitedAt).not.toBeNull();
  });

  it("returns 404 for a nonexistent short code", async () => {
    const response = await request(app).get("/doesnotexist");
    expect(response.status).toBe(404);
  });
});