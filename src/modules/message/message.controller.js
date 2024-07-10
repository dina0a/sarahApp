import { Message } from "../../../db/models/message.model.js"
import { AppError } from "../../utils/appError.js"

// addMessage
export const addMessage = async (req, res, next) => {
    const { content } = req.body
    const { userId } = req.user
    const message = new Message({
        content,
        receiverId: userId
    })
    const createdMessage = await message.save()
    return res.status(201).json({ mesaage: "message created successfully", success: true, data: createdMessage })
}

// getMessage
export const getMessage = async (req, res, next) => {
    const { userId } = req.user;
    if (!userId) {
        next(new AppError("Receiver ID not found", 400))
    }
    const allMessages = await Message.find({ receiverId: userId });
    return res.status(200).json({ message: "successfully", success: true, data: allMessages });
}

export const deleteMessage = async (req, res, next) => {
    const { userId } = req.user;
    const { id } = req.params;

    if (!userId) {
        next(new AppError("user not found", 404))
    }

    const message = await Message.findById(id);
    if (!message) {
        next(new AppError("Message not found", 404))
    }

    if (message.receiverId.toString() !== userId) {
        next(new AppError("You do not have permission to delete this message", 401))
    }

    await Message.findByIdAndDelete(id);
    return res.status(200).json({ message: "Message deleted successfully", success: true });
}
