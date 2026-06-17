import mongoose, { Document } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    age?: number;
    gender?: string;
    bio?: string;
    profilePicture?: string;
    about?: string,
    skills?: string[]
    createdAt: Date;
    updatedAt: Date;
};


const userSchema: mongoose.Schema = new mongoose.Schema<IUser>({
    firstName: { type: String, required: true, maxLength: 50 },
    lastName: { type: String, required: true, maxLength: 50 },
    emailId: {
        type: String, required: true, unique: true, lowercase: true, trim: true, maxLength: 50, index: true,
        validate: {
            validator: (v: string) => validator.isEmail(v),
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String, required: true, maxLength: 100,
        validate: {
            validator: (v: string) => validator.isStrongPassword(v),
            message: 'Password is not strong enough'
        }
    },
    age: { type: Number, min: 18, validate: { validator: (v: number) => v >= 18, message: 'Age must be greater than 18' } },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'others'],
            message: `{VALUE} is not a valid gender type`
        },
        maxLength: 10,
        // validate: {
        //     validator: (v: string) => ['male', 'female', 'others'].includes(v),
        //     message: 'Gender is not valid',
        // },
    },
    bio: {
        type: String, maxlength: 100,
        validate: { validator: (v: string) => v.length <= 100, message: 'Bio must be less than 100 characters' }
    },
    profilePicture: {
        type: String,
        default: 'https://cdn.vectorstock.com/i/500p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.jpg', validate: {
            validator: (v: string) => v.length <= 100, message: 'Profile picture must be less than 100 characters'
        }
    },
    about: {
        type: String, default: "Hello User", maxlength: 150,
        validate: { validator: (v: string) => v.length <= 150, message: 'About must be less than 150 characters' }
    },
    skills: {
        type: [String], maxlength: 50,
        validate: { validator: (v: string) => v.length <= 50, message: 'Skills must be less than 50 characters' }
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;