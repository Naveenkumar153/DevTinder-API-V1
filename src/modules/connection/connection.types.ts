import { ConnectionStatus } from "@/shared/types/common.types.js";
import type { IConnection } from "@/shared/models/connection.model.js";
import type { Document } from "mongoose";

export enum ConnectionValues {
    IGNORE = 'ignore',
    INTERSTED = 'interested',
};

export enum ConnectionResponseTypes {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
};

export type ConnectionResType = ConnectionResponseTypes.ACCEPTED | ConnectionResponseTypes.REJECTED;

export type StatusType = | ConnectionValues | ConnectionResponseTypes;

export interface ConnectionRequest {
    fromUserId: string,
    toUserId: string,
    status: ConnectionValues
};

export interface ConnectionResult {
    message: string,
    connection: IConnection & Document
};

export interface ConnectionResponse {
    id: string,
    toUserId: string,
    status: string
};
