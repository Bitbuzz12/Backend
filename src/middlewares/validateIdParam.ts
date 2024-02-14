import { Request, Response, NextFunction } from "express";
import { validateObjectId } from "../utils/factory";

export default (req: Request,res: Response, next: NextFunction)=>{
    for(let key of Object.keys(req.params)){
        if(key.toLowerCase().endsWith("id")){
            if(!validateObjectId(req.params[key]))return res.status(400).json(`invalid ${key}`)
        }
    }
    next()
}