import { Document, Model, ObjectId, model } from "mongoose";
import { Reactions } from "./reaction";

export interface media_int extends Document{
    type: string
    url: string
    body?: string
    userId: ObjectId
    title?: string
    reactions: Reactions
}
