import mongoose from 'mongoose';
import dotenv from  'dotenv';
dotenv.config();
export const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI || '');
    }
    catch(err: any){
        console.error("Error connecting to the database:", err.message);
        throw new Error("Database connection failed");
    }
}
