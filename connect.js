import mongoose from "mongoose";

export const connectToMongoDB = async (url) => {
    return mongoose.connect(url)
}