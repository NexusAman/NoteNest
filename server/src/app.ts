import express from "express";
import cors from "cors";
import env from "./config/env";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NoteNest API is running!",
  });
});

export default app;
