import { log } from "console";
import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser : true , 
            useUnifiedTopology: true   
        });
        console.log(`Database is connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
        
    }
}
export default connectDB;