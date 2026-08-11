import mongoose from "mongoose";

let isConnected = false

const connectDB = async () => {
  mongoose.set("strictQuery", true)

  // If DB is already connected, do not connect again
  if(isConnected) {
    console.log("MongoDB is already connected");
    return
  }

  // Connect to DB
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    console.log("MongoDB is connected successfully.");
  } catch (error) {
    console.error(error);
    isConnected = false
    throw error
  }
}

export default connectDB