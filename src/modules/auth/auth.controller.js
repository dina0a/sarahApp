import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../../../db/models/user.model.js'
import { sendEmail } from '../../utils/sendEmail.js'
import { AppError } from '../../utils/appError.js'

// signup
export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        next(new AppError("user already exist", 409))
    }
    const hashPassword = bcrypt.hashSync(password, 8)
    const user = new User({
        userName,
        email,
        password: hashPassword
    })
    const createdUser = await user.save()
    createdUser.password = undefined
    const token = jwt.sign({ email }, 'dinasystem')
    sendEmail(email, token)
    return res.status(201).json({ mesaage: "user created successfully", success: true, data: createdUser })
}


// signIn
export const signIn = async (req, res, next) => {
    const { email, password } = req.body
    const userExist = await User.findOne({ email })
    if (!userExist) {
        next(new AppError("invalid credentials", 401))
    }
    const match = bcrypt.compareSync(password, userExist.password)
    if (!match) {
        next(new AppError("invalid credentials", 401))
    }
    const accessToken = jwt.sign({ userId: userExist._id, userName: userExist.userName }, 'dinasystem')
    return res.status(200).json({ mesaage: "logIn successfully", success: true, token: accessToken })
}