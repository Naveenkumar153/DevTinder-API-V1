export interface UpdateUserInfo {
    firstName?: string;
    lastName?: string;
    age?: number;
    gender?: string;
    profilePicture?: string;
    skills?: string[];
    about?: string;
    bio?: string;
};

export enum ConnectionStatus {
    IGNORE = 'ignore',
    INTERSTED = 'interested',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
};

export const connectionStatus = Object.freeze([
    ConnectionStatus.IGNORE,
    ConnectionStatus.INTERSTED,
    ConnectionStatus.ACCEPTED,
    ConnectionStatus.REJECTED,
] as const);