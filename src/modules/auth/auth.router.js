import { Router } from "express";
import { signIn, signup } from "./auth.controller.js";
import { auth } from "../../middleware/authentication.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../middleware/validation.js";
import { signInVal, signupVal } from "./auth.validate.js";

const authRouter = Router()

authRouter.post('/', validate(signupVal), asyncHandler(signup))
authRouter.post('/signIn', validate(signInVal), asyncHandler(signIn))

export { authRouter }