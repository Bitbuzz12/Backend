import mongoose from "mongoose"
import { user_int } from "./types/user"
import { emailRegex } from "../utils/regex"
import { signToken } from "../utils/token"
import bcrypt from "bcrypt"

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
        match: emailRegex,
        unique: true
    }

})

userScehema.methods.genToken = function(){
    const token = signToken({id: this._id})
    return token
}

userScehema.pre("save", async function(){
    if(this.isNew || this.isModified("password")){
        const salt = await bcrypt.genSalt(12)
        const hashed = await bcrypt.hash(this.password, salt)
        this.password = hashed
    }
})

const User = mongoose.model("user", userScehema)


export default User