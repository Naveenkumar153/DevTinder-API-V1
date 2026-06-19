import { IUser } from "@/shared/models/user.model.js";
import { feedRepository } from "@/modules/feed/feed.repository.js";
import { IConnection } from "@/shared/models/connection.model.js";


export const feedService = {


    async getUsers(loginUser: string): Promise<IUser[]> {
        return await feedRepository.getUsers(loginUser);
    },
};