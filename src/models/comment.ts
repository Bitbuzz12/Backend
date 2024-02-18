import mongoose from "mongoose";
import { comment_int } from "./types/comment";
import "./user";

const commentSchema = new mongoose.Schema<comment_int>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    mediaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "media",
        required: true
    },
    body: {
        type: String,
        required: true
    },
    reactions: {
        likes:[],
        dislikes:[],
        hahas: []
    }
}, { timestamps: true})

const Comment = mongoose.model("comment", commentSchema)

export default Comment