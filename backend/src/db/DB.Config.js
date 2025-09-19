import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log("Error while connecting to DB",error);
    }
}

export default connectDB;