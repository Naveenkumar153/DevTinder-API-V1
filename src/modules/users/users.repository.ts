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
        const includeFileds = ['firstName', 'lastName', 'age', 'about', 'gender', 'bio', 'profilePicture', 'skills'];
        const user = await User.findById(id).select(includeFileds).exec();
        return user as unknown as Promise<IUser | null>;
    },

    async getUserConnections(id: string): Promise<IConnection & Document | null> {
        const connections = await connectionSchema.find({
            toUserId: id,
            status: ConnectionStatus.INTERSTED
        })
            .select(['fromUserId', 'toUserId', 'status', '_id'])
            .populate('fromUserId', ['firstName', 'lastName', 'profilePicture', 'age', 'about', 'skills', 'bio']).exec() as unknown as Promise<IConnection & Document | null>
        return connections;
    },

    async getAcceptedConections(id: string): Promise<(IUser & Document)[]> {
        const connections = await connectionSchema.find({
            $or: [
                { toUserId: id, status: ConnectionStatus.ACCEPTED },
                { fromUserId: id, status: ConnectionStatus.ACCEPTED },
            ]
        })
            .select(['fromUserId', 'toUserId', 'status', '_id'])
            .populate('fromUserId', ['firstName', 'lastName', 'profilePicture', 'age', 'about', 'skills', 'bio'])
            .populate('toUserId', ['firstName', 'lastName', 'profilePicture', 'age', 'about', 'skills', 'bio'])
            .exec() as unknown as (IConnection & Document)[];

        return connections.map((row) =>
            row.fromUserId._id.toString() === id.toString() ? row.toUserId : row.fromUserId
        ) as unknown as (IUser & Document)[];
    },

};