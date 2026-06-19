import { feedController } from "@/modules/feed/feed.controller.js";
import { authMiddleware } from "@/shared/middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/feed", authMiddleware.checkToken, feedController.getUsers);

export { router as feedRouters };