import dotenv from "dotenv"

dotenv.config()

const server = {
    port: process.env.PORT,
    secret: process.env.API_SECRET
}

const particle = {
    base_url: process.env.PARTICLE_BASE_URL || "https://api.particle.network/server/rpc",
    server_key: process.env.PARTICLE_SERVER_KEY,
    project_id: process.env.PARTICLE_PROJECT_ID
}

export default {server, particle}