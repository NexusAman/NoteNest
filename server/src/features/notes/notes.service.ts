import { db } from "../../prisma/db.js";
import ApiError from "../../utils/ApiError.js";
import type { CreateNoteInput } from "./notes.schema.js";

const createNote = async (userId: string, input: CreateNoteInput) => {
  let categoryId = input.categoryId;

  if (categoryId) {
    const category = await db.orm.public.Category.first({
      id: categoryId,
      userId,
    });

    if (!category) {
      throw new ApiError(400, "Invalid category");
    }
  } else {
    const category = await db.orm.public.Category.first({
      userId,
      isDefault: true,
    });

    if (!category) {
      throw new ApiError(
        400,
        "Default category not found. Initialize categories first.",
      );
    }

    categoryId = category.id;
  }

  const note = db.orm.public.Note.create({
    title: input.title,
    content: input.content,
    categoryId,
    userId,
    isFavorite: input.isFavorite ?? false,
    isPinned: input.isPinned ?? false,
  });

  return note;
};

export { createNote };
