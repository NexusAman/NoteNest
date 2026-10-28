import type { Request, Response } from "express";
import {
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema,
} from "./categories.schema.js";
import ApiError from "../../../utils/ApiError.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "./categories.service.js";

const createCategoryController = async (req: Request, res: Response) => {
  const result = createCategorySchema.safeParse(req.body);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    });

    throw new ApiError(400, "Invalid category data", errors);
  }
  const userId = req.user!.id;
  const category = await createCategory(userId, result.data);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
};

const getCategoriesController = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const categories = await getCategories(userId);

  res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    data: categories,
  });
};

const getCategoryByIdController = async (req: Request, res: Response) => {
  const result = categoryIdSchema.safeParse(req.params);

  if (!result.success) {
    throw new ApiError(400, "Invalid category ID");
  }

  const userId = req.user!.id;

  const category = await getCategoryById(userId, result.data);

  res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    data: category,
  });
};

const updateCategoryController = async (req: Request, res: Response) => {
  const params = categoryIdSchema.safeParse(req.params);
  if (!params.success) {
    throw new ApiError(400, "Invalid category ID");
  }

  const result = updateCategorySchema.safeParse(req.body);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    });

    throw new ApiError(400, "Invalid category data", errors);
  }

  const userId = req.user!.id;

  const updatedCategory = await updateCategory(
    userId,
    result.data,
    params.data,
  );

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  });
};

const deleteCategoryController = async (req: Request, res: Response) => {
  const result = categoryIdSchema.safeParse(req.params);

  if (!result.success) {
    throw new ApiError(400, "Invalid category ID");
  }

  await deleteCategory(req.user!.id, result.data);

  res.status(204).send();
};

export {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
};
