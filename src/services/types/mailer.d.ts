
export interface mailer_int{
    sendResetToken: (token: string)=>Promise<void>

}