import { Request, Response } from "express";
import { isValidUrl } from "../services/urlValidationService";
import { generateUniqueShortCode } from "../services/shortCodeService";
import prisma from "../models/prismaClient";

export async function shortenUrl(req: Request, res: Response) {
  const { url } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "Invalid URL provided" });
  }

  const shortCode = await generateUniqueShortCode();

  const created = await prisma.url.create({
    data: {
      shortCode,
      longUrl: url,
    },
  });

  return res.status(201).json({
    shortCode: created.shortCode,
    shortUrl: `${req.protocol}://${req.get("host")}/${created.shortCode}`,
    longUrl: created.longUrl,
  });
}
export async function redirectToUrl(req: Request, res: Response) {
  const { shortCode } = req.params;

  if (typeof shortCode !== "string") {
    return res.status(400).json({ error: "Invalid short code" });
  }

  const url = await prisma.url.findUnique({
    where: { shortCode },
  });

  if (!url) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  await prisma.url.update({
    where: { shortCode },
    data: {
      visitCount: { increment: 1 },
      lastVisitedAt: new Date(),
    },
  });

  return res.redirect(302, url.longUrl);
}