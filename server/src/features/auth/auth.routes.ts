import express, { Router } from "express";
import { loginController, signupController } from "./auth.controller.js";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
// router.get("/me");
// router.post("/logout");

export default router;
