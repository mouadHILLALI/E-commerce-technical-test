import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL ?? "";
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined in the environment variables.");
        }
        
        const conn = await mongoose.connect(mongoUrl); 
        console.log(`Database is connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

export default connectDB;
