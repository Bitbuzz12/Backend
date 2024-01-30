export interface particle_int{
    authenticate: (user_id: string, user_token: string)=>Promise<AuthUser>
}

export interface AuthUser{
    uuid: string
    phone: string
    email: string
    name: string
}