import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";    
import User from "../models/user";
import { emailRegex } from "../utils/regex";

export const register = catchAsync(async(req: Request, res: Response)=>{
    const user = await User.create({...req.body})
    const token = user.genToken();
    (req.session as unknown as {token: string}).token = token
    return res.status(201).json({...user.toObject(), password: undefined})
})

export const login = catchAsync(async(req: Request, res: Response)=>{
    const {email, password} = req.body
    if(!email)return res.status(400).json("email is required")
    if(!emailRegex.test(email))return res.status(400).json("invalid email address.")
    if(!password)return res.status(400).json("password is required")
    const user = await User.findOne({email})
    if(!user)return res.status(404).json("email is not registered")
    const passwordMatch = await user.verifyPassword(password)
    if(!passwordMatch)return res.status(400).json("incorrect password")
    const token = user.genToken();
    (req.session as unknown as {token: string}).token = token
    return res.status(201).json({...user.toObject(), password: undefined})
})

export const forgetPassword = catchAsync(async(req: Request, res: Response)=>{
    const {email } = req.body
    if(!email)return res.status(400).json("email is required")
    if(!emailRegex.test(email))return res.status(400).json("invalid email address.")
    const user = await User.findOne({email})
    if(!user)return res.status(404).json("email is not registered")
    
})

export const resetPassword = catchAsync((req: Request, res: Response)=>{

})