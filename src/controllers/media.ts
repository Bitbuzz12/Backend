import catchAsync from "../utils/catchAsync";
import Media, { media_types } from "../models/media";
import Comment from "../models/comment";
import { Request, Response } from "express";
import { user_int } from "../models/types/user";
import { validateObjectId } from "../utils/factory";

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

export const reactToMedia = catchAsync(async(req: Request, res: Response)=>{

})

export const commentOnMedia = catchAsync(async(req: Request, res: Response)=>{

})

export const repostMedia = catchAsync(async(req: Request, res: Response)=>{
    
})
