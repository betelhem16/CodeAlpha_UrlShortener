import { Router } from "express";
import { shortenUrl } from "../controllers/urlController";
import { asyncHandler } from "../middleware/asyncHandler";
import { getUrlStats } from "../controllers/urlController";
import { shortenRateLimiter } from "../middleware/rateLimiter";
const router = Router();


router.post("/shorten", shortenRateLimiter, asyncHandler(shortenUrl));
router.get("/stats/:shortCode", asyncHandler(getUrlStats));
export default router;