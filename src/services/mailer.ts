import nodemailer from "nodemailer"
import { mailer_int } from "./types/mailer";
import config from "../config/config";
import ejs from "ejs"
import path from "path"

export enum mail_types{password_reset="password_reset"}

class Mailer implements mailer_int{
    constructor(
        private email: string,
        private transporter = nodemailer.createTransport({
            url: `smtp://${config.mailer.user}:${config.mailer.pass}@${config.mailer.host}`
        })
        ){}
    private genTemplate = async(name: string, options: object)=>{
        const dir = path.resolve(__dirname, "../views/"+name+".ejs")
        const template = await ejs.renderFile(dir, options)
        return template
    }
    private sendMail = async(type: mail_types, options: object)=>{
        this.transporter.sendMail({
            from: config.mailer.address,
            to: this.email,
            html: await this.genTemplate(type, options)
        })
    }

    public sendResetToken = async(token: string) =>{
        await this.sendMail(mail_types.password_reset, {token})
    }
}

export default Mailer