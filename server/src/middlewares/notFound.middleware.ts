import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new ApiError(404, `Cannot ${req.method} ${req.path}`));
};

export default notFoundMiddleware;
