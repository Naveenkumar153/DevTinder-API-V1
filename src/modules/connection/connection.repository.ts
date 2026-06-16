import { ConnectionRequest } from "@/modules/connection/connection.types.js";
import connectionSchema from "@/shared/models/connection.model.js";
import type { IConnection } from "@/shared/models/connection.model.js";
import User from "@/shared/models/user.model.js";
import type { IUser } from "@/shared/models/user.model.js";
import { ConnectionStatus } from "@/shared/types/common.types.js";
import { Document } from "mongoose";


export const connectionRepository = {
    connectionRequest(req: ConnectionRequest): Promise<IConnection & Document> {
        const { fromUserId, toUserId, status } = req;
        const connection = new connectionSchema({
            fromUserId,
            toUserId,
            status
        });
        return connection.save() as unknown as Promise<IConnection & Document>;
    },

    checkUserId(userId: string): Promise<IUser | null> {
        const user = User.findById(userId).exec();
        return user as Promise<IUser | null>;
    },

    checkExistingRequest(req: ConnectionRequest): Promise<IConnection & Document | null> {
        const { fromUserId, toUserId } = req;
        const connection = connectionSchema.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        });
        return connection as unknown as Promise<IConnection & Document | null>;
    },

    updateConnectionStatus(connectionId: string, status: ConnectionStatus): Promise<IConnection & Document | null> {
        const connection = connectionSchema.findByIdAndUpdate(
            connectionId,
            { status },
            { new: true, runValidators: true }
        );
        return connection as unknown as Promise<IConnection & Document | null>;
    },
};
