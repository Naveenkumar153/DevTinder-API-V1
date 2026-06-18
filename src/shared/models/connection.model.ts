import { connectionStatus, ConnectionStatus } from "@/shared/types/common.types.js";
import { NextFunction } from "express";
import mongoose from "mongoose";



export interface IConnection {
    readonly fromUserId: mongoose.Types.ObjectId,
    readonly toUserId: mongoose.Types.ObjectId,
    readonly status: ConnectionStatus
};

const connectionSchema: mongoose.Schema = new mongoose.Schema<IConnection>({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: connectionStatus as (readonly string[]),
            message: `{VALUE} is incorrect status type`
        }
    }
}, { timestamps: true });

connectionSchema.pre(
    'save',
    async function (this: IConnection) {
        if (this.fromUserId.equals(this.toUserId)) {
            throw new Error(
                'You cannot send a connection request to yourself.'
            );
        }
    }
);

connectionSchema.index({ fromUserId: 1, toUserId: 1 });

const connection = mongoose.model('Connection', connectionSchema);

export default connection;