import jwt from "jsonwebtoken"
import config from "../config/config"

export const signToken = (payload: object) =>{
    const token = jwt.sign(payload, config.server.secret!)
    return token
}