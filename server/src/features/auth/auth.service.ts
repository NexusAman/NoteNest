import type { SignupInput, LoginInput } from "./auth.schema.js";
import { db } from "../../prisma/db.js";
import ApiError from "../../utils/ApiError.js";
import { comparePassword, hashPassword } from "../../utils/password.js";
import { generateToken } from "../../utils/jwt.js";
import DEFAULT_CATEGORIES from "../notes/categories/categories.constants.js";

const signup = async ({ name, email, password }: SignupInput) => {
  const existingUser = await db.orm.public.User.where({ email: email }).first();

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await db.transaction(async (tx) => {
    const newUser = await tx.orm.public.User.create({
      name,
      email,
      password: hashedPassword,
    });

    await tx.orm.public.Category.createAll(
      DEFAULT_CATEGORIES.map((category) => ({
        ...category,
        userId: newUser.id,
      })),
    );

    return newUser;
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

const login = async ({ email, password }: LoginInput) => {
  const user = await db.orm.public.User.where({ email }).first();

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

interface CurrentUserInput {
  userId: string;
}

const getCurrentUser = async ({ userId }: CurrentUserInput) => {
  const user = await db.orm.public.User.where({ id: userId }).first();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export { signup, login, getCurrentUser};
