import User, { IUser } from "@/modules/auth/auth.model.js";


export const feedRepository = {
    getUsers(): Promise<IUser[]> {
        const includeFileds = ['firstName', 'lastName', 'emailId', 'password', 'age', 'gender', 'bio', 'profilePicture'];
        // const excludeFileds = ['-createdAt','-updatedAt','__v'];
        return  User.find({}).select([...includeFileds]).exec() as unknown as Promise<IUser[]>;
    },
};