import { usersRepository } from "@/modules/users/users.index.js";
import { IUser } from "@/shared/models/user.model.js";
import { UpdateUserInfo } from "@/shared/types/common.types.js";


export const usersService = {

    async deleteUser(id: string): Promise<IUser | null> {
        return usersRepository.deleteUser(id);
    },

    async updateUser(id: string, userInfo: UpdateUserInfo): Promise<IUser | null> {
        return usersRepository.updateUser(id, userInfo);
    },

    async getUser(id: string): Promise<IUser | null> {
        return usersRepository.getUser(id);
    }
};