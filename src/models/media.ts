import mongoose from "mongoose"
import { media_int } from "./types/media"

export enum media_types{image="image", video="video"}


const mediaSchema = new mongoose.Schema<media_int>({
    type: {
        type: String,
        enum: Object.keys(media_types),
        required: true
    },
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        maxLength: 255
    },
    body: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reactions: {
        likes:[],
        dislikes:[],
        hahas: []
    },
}, { timestamps: true, })

const Media = mongoose.model("media", mediaSchema)

export default Media