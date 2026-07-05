import { Router } from "express";
import { shortenUrl } from "../controllers/urlController";
import { asyncHandler } from "../middleware/asyncHandler";
import { getUrlStats } from "../controllers/urlController";
const router = Router();


router.post("/shorten", asyncHandler(shortenUrl));
router.get("/stats/:shortCode", asyncHandler(getUrlStats));
export default router;