import { Message } from "../../../db/models/message.model.js"

// addMessage
export const addMessage = async (req, res, next) => {
    try {
        const { content } = req.body
        const { userId } = req.user
        const message = new Message({
            content,
            receiverId: userId
        })
        const createdMessage = await message.save()
        return res.status(201).json({ mesaage: "message created successfully", success: true, data: createdMessage })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ mesaage: err.message, success: false })
    }
}

// getMessage
export const getMessage = async (req, res, next) => {
    try {
        const { userId } = req.user;
        if (!userId) {
            return res.status(400).json({ message: "Receiver ID not found", success: false });
        }
        const allMessages = await Message.find({ receiverId: userId });
        return res.status(200).json({ message: "successfully", success: true, data: allMessages });
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false });
    }
}

// deleteMessage
// export const deleteMessage = async (req, res, next) => {
//     try {
//         const { userId } = req.user
//         const { id } = req.params
//         const isFound = await Message.findById(id)
//         if (!isFound) {
//             throw Error("message not found", { cause: 404 })
//         }
//         if (!userId) {
//             throw Error("Receiver ID not found", { cause: 404 })
//         }
//         const deletedMessage = await Message.findOneAndDelete({ receiverId: userId });
//         return res.status(200).json({ message: "message deleted successfully", success: true });
//     }
//     catch (err) {
//         return res.status(err.cause || 500).json({ message: err.message, success: false });
//     }
// }

export const deleteMessage = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;

        if (!userId) {
            throw Error("user not found", { cause: 404 })
        }

        const message = await Message.findById(id);
        if (!message) {
            throw Error("Message not found", { cause: 404 })
        }

        if (message.receiverId.toString() !== userId) {
            throw Error("You do not have permission to delete this message", { cause: 401 })
        }

        await Message.findByIdAndDelete(id);
        return res.status(200).json({ message: "Message deleted successfully", success: true });
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false });
    }
}
