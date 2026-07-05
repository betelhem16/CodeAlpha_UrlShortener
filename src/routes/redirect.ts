import { Router } from "express";
import { redirectToUrl } from "../controllers/urlController";

const router = Router();

router.get("/:shortCode", redirectToUrl);

export default router;