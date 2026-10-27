import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./features/auth/auth.routes.js";
import notesRoutes from "./features/notes/notes.routes.js"

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NoteNest API is running!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
