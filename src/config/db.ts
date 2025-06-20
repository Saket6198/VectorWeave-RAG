import mongoose from 'mongoose';

export const connectDb = async () => {
    try{
        await mongoose.connect('mongodb+srv://coderarmy:8097911457@coderarmy.4erqhaf.mongodb.net/mastra');
    }
    catch(err: any){
        console.error("Error connecting to the database:", err.message);
        throw new Error("Database connection failed");
    }
}
