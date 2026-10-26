import type { Request, Response } from "express";
import { loginSchema, signupSchema } from "./auth.schema.js";
import ApiError from "../../utils/ApiError.js";
import { getCurrentUser, login, signup } from "./auth.service.js";

const signupController = async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    });

    throw new ApiError(400, "Validation failed", errors);
  }

  const user = await signup(result.data);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};

const loginController = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    });

    throw new ApiError(400, "Validation failed", errors);
  }

  const { token, user } = await login(result.data);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: user,
  });
};

const meController = async (req: Request, res: Response) => {
  const user = await getCurrentUser({
    userId: req.user!.id,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
};

const logoutController = (_req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};

export { signupController, loginController, meController, logoutController };
