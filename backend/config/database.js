import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB =()=>{const connection =  mongoose.connect(process.env.MONGODB_URL)

    if(connection){
        console.log("Every things is done databse connected");
    }else{
        console.log("Database not connected");
    }
};

export default connectDB;
