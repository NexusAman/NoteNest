import { z } from "zod";

const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),

  email: z.email("Invalid email address").trim().toLowerCase(),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),

  // Let the password verification logic determine whether it is correct.
  password: z.string().min(1, "Password is required"),
});

type SignupInput = z.infer<typeof signupSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export { signupSchema, loginSchema };
export type { SignupInput, LoginInput };
