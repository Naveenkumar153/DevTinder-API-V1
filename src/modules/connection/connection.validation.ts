import { BadRequestError } from '@/classes/errors.js';
import { ConnectionValues } from '@/modules/connection/connection.types.js';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const connectionValidations = {
    request(req: Request, res: Response, next: NextFunction) {
        const status = req.params.status as ConnectionValues;
        const requiredStatus = [ConnectionValues.IGNORE, ConnectionValues.INTERSTED];
        const toUserId = req.params.toUserId;

        if (req.id === toUserId) {
            throw new BadRequestError('You cannot send a connection request to yourself');

        }
        if (!toUserId || !status || !requiredStatus.includes(status)) {
            throw new BadRequestError('Invalid Request');
        }
        next();
    }
};