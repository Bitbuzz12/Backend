import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import config from "../config/config";
import User from "../models/user";
import { user_int } from "../models/types/user";

interface ExtReq extends Request{
    user: user_int
}

export default async(req: ExtReq, res: Response, next: NextFunction)=>{
    const token = (req.session as unknown as {token: string}).token
    if(!token)return res.status(401).json("Unauthenticated")
    try{
    const decrypted = jwt.verify(token, config.server.secret!) as {id: string}
    const user = await User.findById(decrypted.id)
    if(!user)return res.status(401).json("Unauthenticated")
    req.user = user
    next()
}catch(err){
    return res.status(401).json("Unauthenticated")
}
}