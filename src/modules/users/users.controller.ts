import { NotFoundError } from "@/classes/errors.js";
import { usersService } from "@/modules/users/users.index.js";
import { UpdateUserInfo } from "@/shared/types/common.types.js";
import { NextFunction, Request, Response } from "express";


export const usersController = {
    async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.id;
            const user = await usersService.getUser(userId);
            res.status(200).send({
                data: user,
                message: 'Get User Profile Successfully'
            })
        } catch (error) {
            console.error('usersController', error);
            next(error);
        }
    },

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.id as string;
            const deleteUser = await usersService.deleteUser(userId);

            if (deleteUser?._id) {
                res.status(204).json({
                    message: 'User deleted successfully'
                });
                return;
            };

            throw new NotFoundError('User not found');
        } catch (error) {
            console.error('usersController', error);
            next(error);
        }
    },

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.id as string;
            const reqBody = req.body as UpdateUserInfo;
            const updateUser = await usersService.updateUser(userId, reqBody);
            if (updateUser?._id) {
                res.status(204).json({
                    message: 'User updated successfully'
                });
                return;
            }

            throw new NotFoundError('User not found');

        } catch (error) {
            console.error('usersController', error);
            next(error);
        }
    },
};