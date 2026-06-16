
import { connectionController } from "@/modules/connection/connection.controller.js";
import { connectionValidations } from "@/modules/connection/connection.validation.js";
import { Router } from "express";

const router = Router();

router.post('/request/send/:status/:toUserId', connectionValidations.request, connectionController.connectionRequest)
    .post('/connection/reponse', connectionController.connectionResponse);

export { router as connectionRouters };