import joi from 'joi'

// signup
export const signupVal = joi.object({
    userName : joi.string().required().messages({"any.required":"name must be required"}),
    email : joi.string().email().required().messages({"any.required":"email must be required"}),
    password : joi.string().pattern(new RegExp('\^[A-Za-z0-9]{3,20}\$')).required().messages({"any.required":"password must be required"}),
}).required()

// signIn
export const signInVal = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('\^[A-Za-z0-9]{3,20}\$')).required(),
}).required()