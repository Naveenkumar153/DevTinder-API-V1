import { usersController } from "@/modules/users/users.controller.js";
import { Router } from "express";

const router = Router();

router.get('/user', usersController.getUser)
      .delete('/:id', usersController.deleteUser)
      .patch('/:id', usersController.updateUser);

router.get('/user/profile', usersController.getUserProfile);

export { router as usersRouters };