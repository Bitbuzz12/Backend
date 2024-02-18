import { Document, ObjectId } from "mongoose";
import { Reactions } from "./reaction";

export interface comment_int{
    mediaId: ObjectId
    userId: ObjectId
    body: string
    reactions: Reactions
}