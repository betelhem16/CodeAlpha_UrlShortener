import { beforeEach, afterAll } from "vitest";
import prisma from "./models/prismaClient";

beforeEach(async () => {
  await prisma.url.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});