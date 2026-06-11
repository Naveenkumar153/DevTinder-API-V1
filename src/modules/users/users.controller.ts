import { usersService } from "@/modules/users/users.service.js";
import { NextFunction, Request, Response } from "express";


export const usersController = {
    async getUser(req:Request, res:Response, next:NextFunction): Promise<void> {
        try {
            const emailId = req.query.emaiId as string;
            const user =  await usersService.getUser(emailId);
            console.log('user',user);
            res.status(200).send({
                data: user,
                message: 'Get User Successfully'
            })
        } catch (error) {
            console.error('usersController', error);
            next(error);
        }
    },

    async deleteUser(req:Request, res:Response, next:NextFunction): Promise<void> {
        try {
             const userId = req.query.id as string;
             const deleteUser = await usersService.deleteUser(userId);

             if(deleteUser?._id){
                 res.status(204).send();
                 return;
             }

             res.status(404).send({
                message: 'User not found'
             })
        } catch (error) {
            console.error('usersController', error);
            next(error);
        }
    },

    async updateUser(req:Request, res:Response, next: NextFunction): Promise<void>{
        try {
            const updateUser = await usersService.updateUser(req.query.id as string, req.body);
            if(updateUser?._id){
                 res.status(204).send();
                 return;
             }

             res.status(404).send({
                message: 'User not found'
             })
        } catch (error) {
            console.error('usersController', error);
            next(error);
        }
    }
};