import mongoose from "mongoose"
import { user_int } from "./types/user"
import { emailRegex } from "../utils/regex"
import { signToken } from "../utils/token"

const userScehema = new mongoose.Schema<user_int>({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: emailRegex
    }

})

userScehema.methods.genToken = function(){
    const token = signToken({id: this._id})
    return token
}

const User = mongoose.model("user", userScehema)


export default User