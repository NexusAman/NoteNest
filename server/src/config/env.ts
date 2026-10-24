import "dotenv/config";

const env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: process.env.PORT ?? 3000,
    saltRounds: process.env.SALT_ROUNDS,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
}

export default env;