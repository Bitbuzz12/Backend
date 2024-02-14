import mongoose from "mongoose";

export const validateObjectId = (id: string) =>mongoose.Types.ObjectId.isValid(id)