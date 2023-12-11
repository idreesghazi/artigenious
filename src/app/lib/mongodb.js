require('dotenv').config();
import mongoose from "mongoose";

const connectMongoDB = () => {
    
    
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined');
    }
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error", err);
  });
}

export default connectMongoDB;