import { Document } from "mongoose";

interface user_int extends Document{
    userName: string
    email: string
    password: string
    genToken: ()=>string
}