import { or } from "@prisma/orm-postgres/orm-client";
import { db } from "../../prisma/db.js";
import ApiError from "../../utils/ApiError.js";
import type {
  CreateNoteInput,
  ListNotesQuery,
  NoteIdInput,
  UpdateNoteInput,
} from "./notes.schema.js";

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

  const note = await db.orm.public.Note.create({
    title: input.title,
    content: input.content,
    categoryId,
    userId,
    isFavorite: input.isFavorite ?? false,
    isPinned: input.isPinned ?? false,
  });

  return note;
};

const getNotes = async (userId: string, query: ListNotesQuery) => {
  const { page, limit, categoryId, search, isFavorite, isPinned } = query;

  const skip = (page - 1) * limit;

  // 1. Build the notes query
  let notesQuery = db.orm.public.Note.where({ userId });

  if (categoryId) {
    notesQuery = notesQuery.where({ categoryId });
  }

  if (search) {
    const term = `%${search}%`;

    notesQuery = notesQuery.where((note) =>
      or(note.title.ilike(term), note.content.ilike(term)),
    );
  }

  if (isFavorite !== undefined) {
    notesQuery = notesQuery.where({
      isFavorite: isFavorite === "true",
    });
  }

  if (isPinned !== undefined) {
    notesQuery = notesQuery.where({
      isPinned: isPinned === "true",
    });
  }

  // 2. Fetch the current page
  const items = await notesQuery
    .include("category")
    .orderBy((note) => note.updatedAt.desc())
    .offset(skip)
    .limit(limit)
    .all();

  // 3. Build the same filters for the total count
  let countQuery = db.orm.public.Note.where({ userId });

  if (categoryId) {
    countQuery = countQuery.where({ categoryId });
  }

  if (search) {
    const term = `%${search}%`;

    countQuery = countQuery.where((note) =>
      or(note.title.ilike(term), note.content.ilike(term)),
    );
  }

  if (isFavorite !== undefined) {
    countQuery = countQuery.where({
      isFavorite: isFavorite === "true",
    });
  }

  if (isPinned !== undefined) {
    countQuery = countQuery.where({
      isPinned: isPinned === "true",
    });
  }

  // 4. Count all matching notes
  const { total } = await countQuery.aggregate((a) => ({
    total: a.count(),
  }));

  // 5. Return notes and pagination details
  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getNoteById = async (userId: string, noteId: NoteIdInput) => {
  const note = await db.orm.public.Note.first({
    userId,
    id: noteId.id,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return note;
};

const updateNote = async (
  userId: string,
  noteId: NoteIdInput,
  input: UpdateNoteInput,
) => {
  const existingNote = await db.orm.public.Note.first({
    userId,
    id: noteId.id,
  });

  if (!existingNote) {
    throw new ApiError(404, "Note not found");
  }

  if (input.categoryId !== undefined) {
    const category = await db.orm.public.Category.first({
      userId,
      id: input.categoryId,
    });

    if (!category) {
      throw new ApiError(400, "Invalid category");
    }
  }

  const updateData = {
    ...(input.title !== undefined ? { title: input.title } : {}),
    ...(input.content !== undefined ? { content: input.content } : {}),
    ...(input.categoryId !== undefined ? { categoryId: input.categoryId } : {}),
    ...(input.isFavorite !== undefined ? { isFavorite: input.isFavorite } : {}),
    ...(input.isPinned !== undefined ? { isPinned: input.isPinned } : {}),
  };

  const note = await db.orm.public.Note.where({
    userId,
    id: noteId.id,
  }).update(updateData);

  return note;
};

const deleteNote = async (userId: string, noteId: NoteIdInput) => {
  const note = await db.orm.public.Note.first({
    userId,
    id: noteId.id,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  await db.orm.public.Note.where({
    userId,
    id: noteId.id,
  }).delete();
};

export { createNote, getNotes, getNoteById, updateNote, deleteNote };
