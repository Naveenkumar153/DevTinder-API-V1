import { NotFoundError } from "@/classes/errors.js";
import { connectionService } from "@/modules/connection/connection.service.js";
import { ConnectionRequest, ConnectionValues } from "@/modules/connection/connection.types.js";
import { NextFunction, Request, Response } from "express";


export const connectionController = {
    async connectionRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const connectionReq: ConnectionRequest = {
                fromUserId: req.id,
                toUserId: req.params.toUserId as string,
                status: req.params.status as ConnectionValues
            };
            console.log('connectionReq', connectionReq);
            const result = await connectionService.connectionRequest(connectionReq);
            console.log('connectionResult', result);
            if (!result.connection?._id) {
                throw new NotFoundError('User not found')
            }

            res.status(200).json({
                message: result.message,
                data: result.connection
            });
            return;
        } catch (error) {
            console.error('Error in connectionRequest', error);
            next(error);
        }
    },

    async connectionResponse(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

        } catch (error) {
            console.error('Error in connectionResponse', error);
            next(error);
        }
    },
};
