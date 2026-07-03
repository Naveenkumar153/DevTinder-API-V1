import mongoose from 'mongoose';

export const connectDB = async () => {
    return await mongoose.connect("mongodb+srv://naveen:E6saexP2UyOnDDAR@node-project.ijcdmqt.mongodb.net/DevTinder") as mongoose.Mongoose;
};


export const disconnectDB = async () => {
    return await mongoose.disconnect();
};