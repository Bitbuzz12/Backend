import express from "express";
import http from "http";
import cors from "cors"
import helmet from "helmet";
import {rateLimit } from "express-rate-limit";
import { connectDB } from "./config/db";
import Session from "express-session"
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"
import config from "./config/config";

const app = express();

const limiter = rateLimit({
    windowMs: 15*60*1000,
    legacyHeaders: false,
    limit: 100,
})

app.use(cors({
    origin: "*"
}))
app.use(helmet())
app.use(limiter)
app.use(Session({
    store: new MongoStore({
        dbName: config.server.name + "-sessions",
    }),
    secret: config.server.secret!
}))

async function start(){
        const server = http.createServer(app)
    connectDB()
    .then(res=>{
        console.log("connected to datatbase...")
        server.on("listening", ()=>{
            console.log(`server running on port ${(server.address() as {port: number}).port}`)
        })
        server.listen()
        return server
    })
    .catch(err=>{
        console.log("error connecting to db: ", err)
        process.exit(1)
    })
}

const server = start()

export default server