import { Router } from "express";
import { addMessage, deleteMessage, getMessage } from "./message.controller.js";
import { auth } from "../../middleware/authentication.js";

const messageRouter = Router()

messageRouter.post('/',auth,addMessage)
messageRouter.get('/',auth,getMessage)
messageRouter.delete('/:id',auth,deleteMessage)

export { messageRouter }