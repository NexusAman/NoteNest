import { Router } from "express";
import authMiddleware from "../../../middlewares/auth.middleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
} from "./categories.controller.js";

const router = Router();

router.get("/", authMiddleware, getCategoriesController);
router.post("/", authMiddleware, createCategoryController);
router.get("/:id", authMiddleware, getCategoryByIdController);
router.patch("/:id", authMiddleware, updateCategoryController);
router.delete("/:id", authMiddleware, deleteCategoryController);

export default router;
