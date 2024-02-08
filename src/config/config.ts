import dotenv from "dotenv"

dotenv.config()

const server = {
    port: process.env.PORT,
    secret: process.env.API_SECRET,
    protocol: `http${process.env.NODE_ENV === "production"?"s":""}`,
    host: process.env.host || "localhost",
    name: "Bitbuzz"
}

const db = {
    url: process.env.DB_URI || "mongodb://localhost:27017/Bitbuzz"
}

const particle = {
    base_url: process.env.PARTICLE_BASE_URL || "https://api.particle.network/server/rpc",
    server_key: process.env.PARTICLE_SERVER_KEY,
    project_id: process.env.PARTICLE_PROJECT_ID
}

const mailer = {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    port: process.env.MAIL_PORT || 587,
    host: process.env.MAIL_HOST,
    address: process.env.MAIL_ADDRESS
}

export default {server, particle, db, mailer}