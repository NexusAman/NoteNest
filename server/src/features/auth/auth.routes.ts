import express, { Router } from "express";
import { signupController } from "./auth.controller.js";

const router = Router();

router.post("/signup", signupController);
// router.post("/login");
// router.get("/me");
// router.post("/logout");

export default router;