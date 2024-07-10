import { model, Schema } from "mongoose";

// schema
const messageSchema = new Schema({
    content: String,
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

// model
export const Message = model('Message', messageSchema)