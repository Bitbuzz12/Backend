import mongoose from "mongoose"
import { user_int } from "./types/user"
import { emailRegex } from "../utils/regex"
import { signToken } from "../utils/token"
import bcrypt from "bcrypt";
import crypto from "crypto"
import Mailer from "../services/mailer";

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
    },
    resetToken: {
        type: String
    },
    tokenExpiresIn: {
        type: Number
    }
})

userScehema.methods.genToken = function(){
    const token = signToken({id: this._id})
    return token
}

userScehema.methods.verifyPassword = function(pass: string){
    return bcrypt.compare(pass, this.password)
}

userScehema.methods.sendResetToken = async function(){
    let token = crypto.createHash("sha256").update(crypto.randomBytes(22).toString("hex")).digest("base64")
    this.resetToken = token
    this.tokenExpiresIn = Date.now() + (1000 * 60 * 60 * 2)
    await this.save()
    const mailer = new Mailer(this.email)
    await mailer.sendResetToken(token)
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