import User, { IUser } from "@/modules/auth/auth.model.js";
import { UpdateUserInfo } from "@/modules/users/users.types.js";


export const usersRepository = {
    async getUser(emailId:string):Promise<IUser | null> {
        const user = await User.findOne({ emailId }).exec();
        return user as unknown as Promise<IUser | null>
    },

    async deleteUser(id:string):Promise<IUser | null> {
        const deleteUser = await User.findByIdAndDelete(id);
        return deleteUser as unknown as Promise<IUser | null>;
    },

    async updateUser(id:string,userInfo:UpdateUserInfo):Promise<IUser | null>{
        const updateUser = await User.findByIdAndUpdate({ _id: id }, userInfo, {
            returnDocument:'after',
            runValidators:true,
        });
        return updateUser as unknown as Promise<IUser | null>;
    },
    
    async findUserById(id:string){
        const findUser = await User.findById(id) as unknown as Promise<IUser | null>;
        return findUser;
    }
};