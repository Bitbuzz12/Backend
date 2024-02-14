import { Document, ObjectId } from "mongoose";

export interface comment_int{
    mediaId: ObjectId
    userId: ObjectId
    body: string
}