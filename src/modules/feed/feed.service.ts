import { IUser } from "@/modules/auth/auth.model.js";
import { feedRepository } from "@/modules/feed/feed.repository.js";


export const feedService = {
    async getUsers():Promise<IUser[]> {
        return await feedRepository.getUsers();
    },
};