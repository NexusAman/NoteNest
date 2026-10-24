import type { Request, Response } from "express";
import { signupSchema } from "./auth.schema.js";
import ApiError from "../../utils/ApiError.js";
import { signup } from "./auth.service.js";

const signupController = async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    const errors: Record<string, string> = {};

    for (const issue of result.error.issues) {
      const field = issue.path[0];

      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    }

    throw new ApiError(400, "Validation failed", errors);
  }

  const user = await signup(result.data);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
};

export { signupController };
