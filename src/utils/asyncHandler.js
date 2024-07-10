import { AppError } from "./appError.js"

export function asyncHandler(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            next(new AppError(err.message, err.statusCode))
        })
    }
}

export const globalErrorhandler = (err,req,res,next) => {
    if(req.errArray){
        return res.status(err.statusCode || 500).json({ message: req.errArray, success: false })
        }
        return res.status(err.statusCode || 500).json({ message: err.message, success: false })
 }