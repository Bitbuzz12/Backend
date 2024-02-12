import { Document } from "mongoose";

interface user_int extends Document{
    userName: string
    email: string
    password: string
    genToken: ()=>string
    verifyPassword: (pass: string)=>Promise<boolean>
    sendResetToken: ()=>Promise<void>
    resetToken?: string
    tokenExpiresIn?: number
}