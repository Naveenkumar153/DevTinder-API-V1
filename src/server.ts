import { app } from "@/app.js";
import { connectDB } from "@/config/database.config.js";
import { Mongoose } from "mongoose";

const PORT = process.env.PORT || 3000;

async function bootstrap():Promise<void> {
    connectDB().then((res: Mongoose) => {
        console.log("Connected to MongoDB", res.connection.host);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((error: unknown) => {
        console.error("Error connecting to MongoDB:", error);
    });
};

bootstrap();