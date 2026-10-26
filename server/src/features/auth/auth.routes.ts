import { Router } from "express";
import {
  loginController,
  meController,
  signupController,
  logoutController,
} from "./auth.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/me", authMiddleware, meController);
router.post("/logout", logoutController);

export default router;
