import { z } from "zod";

const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(50, "Category name must not exceed 50 characters"),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex color")
    .optional(),
});

const updateCategorySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Category name cannot be empty")
      .max(50, "Category name must not exceed 50 characters")
      .optional(),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex color")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

const categoryIdSchema = z.object({
  id: z.uuid("Invalid category ID"),
});

type CreateCategoryInput = z.infer<typeof createCategorySchema>;

type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

type CategoryIdInput = z.infer<typeof categoryIdSchema>;

export { createCategorySchema, updateCategorySchema, categoryIdSchema };

export type { CreateCategoryInput, UpdateCategoryInput, CategoryIdInput };
