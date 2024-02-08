import mongoose from "mongoose"
import config from "./config"


export const connectDB =()=>{
    return mongoose.connect(config.db.url, {retryWrites: true, })
}