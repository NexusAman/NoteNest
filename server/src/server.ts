import app from "./app.js";
import env from "./config/env.js";
import { db } from "./prisma/db.js";

const startServer = async () => {
  await db.connect({ url: process.env["DATABASE_URL"]! });

  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
  });
};

startServer().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exitCode = 1;
});
