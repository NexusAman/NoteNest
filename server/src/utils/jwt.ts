import jwt from "jsonwebtoken";
import env from "../config/env.js";

const generateToken = (userId: string): string => {
  return jwt.sign(
    {
      userId,
    },
    env.jwtSecret,
    {
      expiresIn: "1d",
    },
  );
};

const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, env.jwtSecret) as { userId: string };
};

export { generateToken, verifyToken };
