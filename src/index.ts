import express from "express";
import http from "http";
import cors from "cors"
import helmet from "helmet";
import {rateLimit } from "express-rate-limit"
import particle from "./services/particle";

const app = express();
(async()=>{
    try{
    const t = await particle.authenticate("evm_chain", "0x6D5fCEd0C74F22a1B145ef48B25527Ce9BF829bF")
    console.log(t)

    }catch(err){
        console.log(err)
    }
})()

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

async function start(){
    const server = http.createServer(app)
    server.on("listening", ()=>{
        console.log(`server running on port ${(server.address() as {port: number}).port}`)
    })
    server.listen()
    return server
}

const server = start()

export default server