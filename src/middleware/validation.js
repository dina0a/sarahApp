import { AppError } from "../utils/appError.js"

export const validate = (schema) => {
    return (req, res, next) => {
        let data = { ...req.body, ...req.params, ...req.query }
        const { error } = schema.validate(data, { abortEarly: false })
        if (error) {
            const errArray = error.details.map(ele => ele.message)
            req.errArray = errArray
            next(new AppError(error, 401))
        }
        next()
    }
}