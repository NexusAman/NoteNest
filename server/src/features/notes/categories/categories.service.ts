import { db } from "../../../prisma/db.js";
import ApiError from "../../../utils/ApiError.js";
import type {
  CategoryIdInput,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./categories.schema.js";

const isUniqueConstraintViolation = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  if ("code" in error && error.code === "23505") {
    return true;
  }

  return "cause" in error && isUniqueConstraintViolation(error.cause);
};

const createCategory = async (userId: string, input: CreateCategoryInput) => {
  const existingCategory = await db.orm.public.Category.where({
    userId,
    name: input.name,
  }).first({});

  if (existingCategory) {
    throw new ApiError(409, "Category already exists");
  }

  try {
    const category = await db.orm.public.Category.create({
      name: input.name,
      ...(input.color !== undefined ? { color: input.color } : {}),
      userId,
    });

    return category;
  } catch (error) {
    if (isUniqueConstraintViolation(error)) {
      throw new ApiError(409, "Category already exists");
    }

    throw error;
  }
};

const getCategories = async (userId: string) => {
  const categories = await db.orm.public.Category.where({ userId }).all();

  if (!categories) {
    throw new ApiError(404, "Categories not found");
  }

  return categories;
};

const getCategoryById = async (userId: string, categoryId: CategoryIdInput) => {
  const category = await db.orm.public.Category.where({
    userId,
    id: categoryId.id,
  }).first({});

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

const updateCategory = async (
  userId: string,
  input: UpdateCategoryInput,
  id: CategoryIdInput,
) => {
  const category = await getCategoryById(userId, id);

  if (input.name && input.name !== category.name) {
    const existingCategory = await db.orm.public.Category.where({
      userId,
      name: input.name,
    }).first({});

    if (existingCategory) {
      throw new ApiError(409, "Category name already exists");
    }
  }

  try {
    const updatedCategory = await db.orm.public.Category.where({
      userId,
      id: id.id,
    }).update({
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.color !== undefined ? { color: input.color } : {}),
    });

    return updatedCategory;
  } catch (error) {
    if (isUniqueConstraintViolation(error)) {
      throw new ApiError(409, "Category name already exists", {
        name: "A category with this name already exists",
      });
    }

    throw error;
  }
};

const deleteCategory = async (userId: string, input: CategoryIdInput) => {
  await getCategoryById(userId, input);

  return await db.orm.public.Category.where({
    userId,
    id: input.id,
  }).delete();
};

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
