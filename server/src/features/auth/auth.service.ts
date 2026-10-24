import type { SignupInput } from "./auth.schema.js";
import { db } from "../../prisma/db.js";
import ApiError from "../../utils/ApiError.js";
import { hashPassword } from "../../utils/password.js";

const signup = async ({ name, email, password }: SignupInput) => {
  const existingUser = await db.orm.public.User.where({ email: email }).first();

  if (existingUser) {
    throw new ApiError(409, "Email already, exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await db.orm.public.User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    email: user.email,
    createdAt: user.createdAt,
  };
};

export { signup };
