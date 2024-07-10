// import modules
import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/sarahApp").then(() => {
        console.log("db connected successfully");
    }).catch((err) => {
        console.log("field connected to db");
    })
}

