import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
    try {
        const { token } = req.headers
        const payload = jwt.verify(token, 'dinasystem')
        req.user = payload
        next()
    } catch (err) {
        return res.status(err.cause || 500).json({ mesaage: err.message, success: false })
    }
}