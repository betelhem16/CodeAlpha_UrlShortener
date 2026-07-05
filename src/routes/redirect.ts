import { Router } from "express";
import { redirectToUrl } from "../controllers/urlController";
import { asyncHandler } from "../middleware/asyncHandler";
const router = Router();
router.get("/:shortCode", asyncHandler(redirectToUrl));



export default router;