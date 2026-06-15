import { usersController } from "@/modules/users/users.controller.js";
import { usersValidation } from "@/modules/users/users.validation.js";
import { Router } from "express";

const router = Router();

router.get('/user/view', usersController.getUser);
router.delete('/user/delete', usersController.deleteUser);
router.patch('/user/update', usersValidation.updateUser, usersController.updateUser);


export { router as usersRouters };