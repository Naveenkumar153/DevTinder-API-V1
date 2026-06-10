import { IUser } from "@/modules/auth/auth.model.js";
import { feedService } from "@/modules/feed/feed.service.js";
import { NextFunction, Request, Response } from "express";


export const feedController = {
    async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const allUsers =  await feedService.getUsers();
             res.status(200).send({
                data: allUsers,
                message:'Users get successfully'
             })
        } catch (error) {
            console.error('Error in signup:', error);
            next(error);
        }
    },
};