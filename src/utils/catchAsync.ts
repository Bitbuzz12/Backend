import { Request, Response, NextFunction } from "express";


export default (fn: Function)=>{
    return async(req: Request, res: Response, next: NextFunction)=>{
        try{
            return await fn(req, res, next)
        }catch(ex: any){
            if(ex.code === 11000)return res.status(409).json(`${Object.keys(ex.keyValue)[0]} already existed.`)
        const mongooseErrors: string[] = []
        if(ex._message?.includes("validation failed"))
            Object.keys(ex.errors).forEach(er=>{
                mongooseErrors.push(ex.errors[er].properties.message)
        })
        if(mongooseErrors.length > 0)return res.status(400).json(mongooseErrors)
        console.log(ex)
        return res.status(500).json("Internal server error")
        }
    }
}