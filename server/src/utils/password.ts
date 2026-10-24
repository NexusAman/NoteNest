import bcrypt from "bcryptjs";
import env from "../config/env.js";

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, env.saltRounds);
};

export { hashPassword };
