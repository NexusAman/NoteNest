import type { Request, Response, NextFunction } from "express";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // If the response has already started, delegate to Express.
  if (res.headersSent) {
    return next(err);
  }

  // Log errors during development.
  if (env.nodeEnv === "development") {
    console.error(err);
  }

  // Handle errors we intentionally created.
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  // Handle unexpected errors safely.
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;
