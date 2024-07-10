// import modules
import express from 'express'
import jwt from 'jsonwebtoken'
import { connectDB } from './db/connection.js'
import { authRouter } from './src/modules/auth/auth.router.js'
import { User } from './db/models/user.model.js'
import { messageRouter } from './src/modules/message/message.router.js'
import { globalErrorhandler } from './src/utils/asyncHandler.js'

// create server 
const app = express()
const port = 3000

// parse json
app.use(express.json())

// connextDB
connectDB()

// routing
app.use('/auth', authRouter)
app.use('/message', messageRouter)
app.get('/verify/:token', async (req, res, next) => {
    const { token } = req.params
    const payload = jwt.verify(token, 'dinasystem')
    await User.findOneAndUpdate({ email: payload.email }, { verifyEmail: true })
    return res.json({ message: "email verifyed successfully go to login", success: true })
})

app.use(globalErrorhandler)

// listen on server
app.listen(port, (() => {
    console.log("server is running on port...", port);
}))