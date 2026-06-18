import { connectionSchema } from "@/modules/connection/connection.index.js";
import { IConnection } from "@/shared/models/connection.model.js";
import User, { IUser } from "@/shared/models/user.model.js";
import { ConnectionStatus, UpdateUserInfo } from "@/shared/types/common.types.js";


export const usersRepository = {

    async deleteUser(id: string): Promise<IUser | null> {
        const deleteUser = await User.findByIdAndDelete(id);
        return deleteUser as unknown as Promise<IUser | null>;
    },

    async updateUser(id: string, userInfo: UpdateUserInfo): Promise<IUser | null> {
        const updateUser = await User.findByIdAndUpdate({ _id: id }, userInfo, {
            returnDocument: 'after',
            runValidators: true,
        });
        return updateUser as unknown as Promise<IUser | null>;
    },

    async findUserById(id: string) {
        const findUser = await User.findById(id) as unknown as Promise<IUser | null>;
        return findUser;
    },

    async getUser(id: string): Promise<IUser | null> {
        const user = await User.findById(id).exec();
        return user as unknown as Promise<IUser | null>;
    },

    async getUserConnections(id: string): Promise<IConnection & Document | null> {
        const connections = await connectionSchema.find({
            toUserId: id,
            status: ConnectionStatus.INTERSTED
        }).populate('fromUserId', ['firstName', 'lastName', 'profilePicture', 'age', 'about', 'skills', 'bio']).exec() as unknown as Promise<IConnection & Document | null>
        return connections;
    },

    async getAcceptedConections(id: string): Promise<IConnection & Document | null> {
        let connections = await connectionSchema.find({
            $or: [
                { toUserId: id, status: ConnectionStatus.ACCEPTED },
                { fromUserId: id, status: ConnectionStatus.ACCEPTED },
            ]
        })
            .populate('fromUserId', ['firstName', 'lastName', 'profilePicture', 'age', 'about', 'skills', 'bio'])
            .populate('toUserId', ['firstName', 'lastName', 'profilePicture', 'age', 'about', 'skills', 'bio'])
            .exec() as unknown as Promise<IConnection & Document | null>;
        return connections;
    },
};