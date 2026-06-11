import { IUser } from "@/modules/auth/auth.model.js";
import { usersRepository } from "@/modules/users/user.repository.js";
import { UpdateUserInfo } from "@/modules/users/users.types.js";


export const usersService = {
    async getUser(emailId:string):Promise<IUser | null> {
        return usersRepository.getUser(emailId);
    },

    async deleteUser(id:string):Promise<IUser | null>{
        return usersRepository.deleteUser(id);
    },

    async updateUser(id:string,userInfo:UpdateUserInfo):Promise<IUser | null> {
        return usersRepository.updateUser(id, userInfo);
    },
};