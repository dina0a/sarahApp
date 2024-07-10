import { Router } from "express";
import { addMessage, deleteMessage, getMessage } from "./message.controller.js";
import { auth } from "../../middleware/authentication.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const messageRouter = Router()

messageRouter.post('/', auth, asyncHandler(addMessage))
messageRouter.get('/', auth, asyncHandler(getMessage))
messageRouter.delete('/:id', auth, asyncHandler(deleteMessage))

export { messageRouter }