import { Router } from "express";
import { getUser } from "../controllers/user";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Protected route (requires JWT token)
router.get("/:id", authenticateToken, getUser);

export default router;