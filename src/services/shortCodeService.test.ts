import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateUniqueShortCode } from "./shortCodeService";
import prisma from "../models/prismaClient";

vi.mock("../models/prismaClient", () => ({
  default: {
    url: {
      findUnique: vi.fn(),
    },
  },
}));

describe("generateUniqueShortCode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a 7-character code when there is no collision", async () => {
    (prisma.url.findUnique as any).mockResolvedValue(null);

    const code = await generateUniqueShortCode();

    expect(code).toHaveLength(7);
    expect(prisma.url.findUnique).toHaveBeenCalledTimes(1);
  });

  it("retries when the first generated code already exists", async () => {
    (prisma.url.findUnique as any)
      .mockResolvedValueOnce({ id: 1, shortCode: "existing" })
      .mockResolvedValueOnce(null);

    const code = await generateUniqueShortCode();

    expect(code).toHaveLength(7);
    expect(prisma.url.findUnique).toHaveBeenCalledTimes(2);
  });

  it("throws after exceeding max retries with persistent collisions", async () => {
    (prisma.url.findUnique as any).mockResolvedValue({ id: 1, shortCode: "existing" });

    await expect(generateUniqueShortCode()).rejects.toThrow(
      "Failed to generate a unique short code after maximum retries"
    );
  });
});