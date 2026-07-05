import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const CODE_LENGTH = 7;
const MAX_RETRIES = 5;

function generateRandomCode(): string {
  return crypto.randomBytes(6).toString("base64url").slice(0, CODE_LENGTH);
}

export async function generateUniqueShortCode(): Promise<string> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const code = generateRandomCode();

    const existing = await prisma.url.findUnique({
      where: { shortCode: code },
    });

    if (!existing) {
      return code;
    }
  }

  throw new Error("Failed to generate a unique short code after maximum retries");
}