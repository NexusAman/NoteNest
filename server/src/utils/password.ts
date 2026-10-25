import bcrypt from "bcryptjs";
import env from "../config/env.js";

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, env.saltRounds);
};

const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
