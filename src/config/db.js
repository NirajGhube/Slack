import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDb = async () => {
    try{
      const conn= await mongoose.connect(ENV.MONGO_URI);
      console.log("MongoDB Connected successfully.",conn.connection.host);

    }catch (error){
        console.log("Error to connecting to mongoDB:",error);
        process.exit(1); //1 is error ,o is success
    }
}