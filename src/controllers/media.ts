import catchAsync from "../utils/catchAsync";
import Media, { media_types } from "../models/media";
import Comment from "../models/comment";
import { Request, Response } from "express";
import { user_int } from "../models/types/user";
import { reactions, validateObjectId } from "../utils/factory";
import { Reactions } from "../models/types/reaction";

interface ExtReq extends Request{
    user: user_int
}

export const createMedia = catchAsync(async(req: ExtReq, res: Response, )=>{
    const media = await Media.create({...req.body, userId: req.user._id})
    return res.status(201).json(media)
})

export const getMyMedias = catchAsync(async(req: ExtReq, res: Response)=>{
    const medias = await Media.find({userId: String(req.user._id)})
    return res.status(200).json(medias)
})

export const getMedias = catchAsync(async(req: Request, res: Response)=>{
    const { userId, type} = req.query
    const page = parseInt(String(req.query.page)) || 1
    const count = parseInt(String(req.query.count)) || 20
    const query:{[key: string]: string} = {}
    if(userId){
        if(!validateObjectId(userId.toString()))return res.status(400).json("invalid userId")
        query["userId"] = userId.toString()
    }
    if(type){
        if(!media_types[type as keyof typeof media_types]){
            query["type"] = type.toString()
        }
    }
    const medias = await Media.find(query).skip((page - 1)*count).limit(count)
    return res.status(200).json(medias)
})

export const getMedia = catchAsync(async(req: Request, res: Response)=>{
    const media = await Media.findById(req.params.mediaId)
    if(!media)return res.status(400).json("media not found")
    return res.status(200).json(media)
})

export const deleteMedia = catchAsync(async(req: ExtReq, res: Response)=>{
    const deleted = await Media.findOneAndDelete({userId: req.user._id.toString(), _id: req.params.mediaId})
    return res.status(200).json(deleted)
    
})

export const reactToMedia = catchAsync(async(req: ExtReq, res: Response)=>{
    const {reaction} = req.query.reaction || req.body.reaction
    if(!reaction)return res.status(400).json("select a reaction to react.")
    if(!Object.values(reactions).includes(reaction.toString().toLowerCase()))return res.status(400).json(`invalid reaction "${reaction}"`)
    const {mediaId} = req.params
    let media = await Media.findById(mediaId)
    if(!media)return res.status(404).json("media not found")
    if(media.reactions[reaction as keyof Reactions].includes(req.user._id.toString())){
        media.reactions[reaction as keyof Reactions] = media.reactions[reaction as keyof Reactions].filter(uid=>uid !== req.user._id.toString())
    }else{
        media.reactions[reaction as keyof Reactions].push(req.user._id.toString())
    }
    media = await media.save()
    return res.status(200).json(media)
})

export const commentOnMedia = catchAsync(async(req: ExtReq, res: Response)=>{
    const media = await Media.findById(req.params.mediaId)
    if(!media)return res.status(404).json("Media not found.")
    const comment = await Comment.create({...req.body, mediaId: media._id.toString(), userId: req.user._id.toString()})
    return res.status(201).json(comment)
})

export const getComments = catchAsync(async(req: Request, res: Response)=>{
    const media = await Media.findById(req.params.mediaId)
    if(!media)return res.status(404).json("Media not found.")
    const comments = await Comment.find({mediaId: media._id.toString()})
    return res.status(200).json(comments)
})

export const repostMedia = catchAsync(async(req: ExtReq, res: Response)=>{
    const media = await Media.findById(req.params.mediaId)
    if(!media)return res.status(404).json("Media not found.")
    const newMedia = await Media.create({...media.toObject(), _id: undefined, reactions: {likes:[], dislikes: [], haha: []}, userId: req.user._id.toString()})
    return res.status(200).json(newMedia)
})
