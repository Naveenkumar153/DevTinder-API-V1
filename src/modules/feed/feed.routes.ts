import { feedController } from "@/modules/feed/feed.controller.js";
import { Router } from "express";

const router = Router();

router.get("/feed", feedController.getUsers);

export { router as feedRouter };