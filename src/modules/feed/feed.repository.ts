import { connectionSchema } from "@/modules/connection/connection.index.js";
import { IConnection } from "@/shared/models/connection.model.js";
import User, { IUser } from "@/shared/models/user.model.js";
import mongoose from "mongoose";


export const feedRepository = {
    async getUsers(loginUser: string): Promise<IUser[]> {
        const includeFileds = ['firstName', 'lastName', 'age', 'about', 'gender', 'bio', 'profilePicture', 'skills'];
        // const excludeFileds = ['-createdAt','-updatedAt','__v'];
        let users = await connectionSchema.find({
            $or: [
                { fromUserId: loginUser },
                { toUserId: loginUser }
            ]
        }).select('fromUserId toUserId') as unknown as IConnection[];

        const hideUserFromFeed = new Set<mongoose.Types.ObjectId>();
        users.forEach((user: IConnection) => {
            hideUserFromFeed.add(user.fromUserId);
            hideUserFromFeed.add(user.toUserId);
        });
        // hideUserFromFeed.add(loginUser);

        const showUsersToFeed = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: new mongoose.Types.ObjectId(loginUser) } }
            ],
        }).select([...includeFileds]).lean().exec();


        return showUsersToFeed as unknown as IUser[];
    },
};