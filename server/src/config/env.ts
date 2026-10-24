import "dotenv/config";

const env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: Number.parseInt(process.env.PORT ?? "3000"),
    saltRounds: Number.parseInt(process.env.SALT_ROUNDS ?? "10", 10),
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
}

export default env;