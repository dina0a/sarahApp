import { model, Schema } from "mongoose";

// schema
const userSchema = new Schema({
    userName: String,
    email: String,
    password: String,
    verifyEmail: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// model
export const User = model('User', userSchema)