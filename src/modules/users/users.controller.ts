import { NotFoundError } from "@/classes/errors.js";
import { usersService } from "@/modules/users/users.index.js";
import { NextFunction, Request, Response } from "express";


export const usersController = {
    async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const emailId = req.query.emaiId as string;
            const user = await usersService.getUser(emailId);
            res.status(200).send({
                data: user,
                message: 'Get User Successfully'
            })
        } catch (error) {
            console.error('usersController', error);
            next(error);
        }
    },

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.query.id as string;
            const deleteUser = await usersService.deleteUser(userId);

            if (deleteUser?._id) {
                res.status(204).send();
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
            const updateUser = await usersService.updateUser(req.query.id as string, req.body);
            if (updateUser?._id) {
                res.status(204).send();
                return;
            }

            throw new NotFoundError('User not found');

        } catch (error) {
            console.error('usersController', error);
            next(error);
        }
    },

    async getUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.id;
            const user = await usersService.getUserProfile(userId);
            res.status(200).send({
                data: user,
                message: 'Get User Profile Successfully'
            })
        } catch (error) {
            console.error('usersController', error);
            next(error);
        }
    },
};