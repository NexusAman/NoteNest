import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(new ApiError(401, "Authenticaiton required"));
  }

  try {
    const payload = verifyToken(token);

    req.user = {
      id: payload.userId,
    };
    return next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

export default authMiddleware;
