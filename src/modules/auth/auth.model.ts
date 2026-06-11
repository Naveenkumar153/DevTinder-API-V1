import mongoose, { Document } from "mongoose";

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


const userSchema : mongoose.Schema = new mongoose.Schema<IUser>({
    firstName: { type: String, required: true, maxLength:50 },
    lastName: { type: String, required: true, maxLength:50 },
    emailId: { type: String, required:true, unique:true, lowercase:true, trim:true, maxLength:50 },
    password: { type: String, required: true, maxLength:50 },
    age: { type: Number, min:18  },
    gender: { 
        type: String, 
        enum: ['male', 'female', 'others'], 
        maxLength:10,
        // match:[
        //     '/^\S+@\S+\.\S+$/',
        //     'Please enter a valid email'
        // ],
        validate: { 
            validator: (v:string) => ['male','female','others'].includes(v),
            message: 'Gender is not valid'
        },
    },
    bio: { type: String, maxlength: 100 },
    profilePicture: { type: String, default: 'https://cdn.vectorstock.com/i/500p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.jpg' },
    about: { type: String, default: "Hello User", maxlength: 150 },
    skills: { type: [String], maxlength: 50 }
 }, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;