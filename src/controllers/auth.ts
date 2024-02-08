import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";    
import User from "../models/user";

export const register = catchAsync(async(req: Request, res: Response)=>{
    const user = await User.create({...req.body})
    const token = user.genToken();
    (req.session as unknown as {token: string}).token = token
    return res.status(201).json({...user.toObject(), password: undefined})
})

export const login = catchAsync((req: Request, res: Response)=>{
    const {email, password} = req.body
})

export const forgetPassword = catchAsync((req: Request, res: Response)=>{

})

export const resetPassword = catchAsync((req: Request, res: Response)=>{

})