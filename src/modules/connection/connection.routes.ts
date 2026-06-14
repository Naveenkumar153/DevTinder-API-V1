
import { connectionController } from "@/modules/connection/connection.index.js";
import { Router } from "express";

const router = Router();

// router.post('/connection/request', connectionController.connectionRequest)
//     .post('/connection/reponse', connectionController.connectionResponse);

export { router as connectionRouters };