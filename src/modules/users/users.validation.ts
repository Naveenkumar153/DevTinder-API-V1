import { BadRequestError } from "@/classes/errors.js";
import { UpdateUserInfo } from "@/shared/types/common.types.js";
import { Request, Response, NextFunction } from "express";
import Validator from "validator";
export const usersValidation = {
    updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userInfo = req.body as UpdateUserInfo
            const keys = [
                "firstName",
                "lastName",
                "age",
                "gender",
                "profilePicture",
                "skills",
                "about",
                "bio",
            ];
            const invalidKeys = Object.keys(userInfo).filter((key) => !keys.includes(key)) as string[];
            console.log('invalidKeys', invalidKeys);

            if (!userInfo) {
                throw new BadRequestError('Missing required fields');
            };
            if (invalidKeys.length > 0) {
                throw new BadRequestError('Invalid fields');
            };

            if (userInfo.firstName && userInfo.firstName.length > 50 || userInfo.lastName && userInfo.lastName.length > 50) {
                throw new BadRequestError('Fields must be less than 50 characters');
            };

            if (userInfo.age && userInfo.age < 18) {
                throw new BadRequestError('Age must be greater than 18');
            };

            if (userInfo.skills && userInfo.skills.length > 50) {
                throw new BadRequestError('Skills must be less than 50 characters');
            };

            if (userInfo.about && userInfo.about.length > 300) {
                throw new BadRequestError('About must be less than 300 characters');
            };

            if (userInfo.bio && userInfo.bio.length > 100) {
                throw new BadRequestError('Bio must be less than 100 characters');
            };

            if (userInfo.profilePicture && !Validator.isURL(userInfo.profilePicture)) {
                throw new BadRequestError('Profile picture must be a valid URL');
            };

            if (userInfo.gender && !['male', 'female', 'others'].includes(userInfo.gender)) {
                throw new BadRequestError('Gender is not valid');
            };

            next();
        } catch (error) {
            console.error('usersValidation', error);
            next(error);
        }
    }
};