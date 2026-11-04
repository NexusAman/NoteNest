import { z } from "zod";

const createNoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),

  content: z.string().max(50000, "Content cannot exceed 50000 characters"),

  categoryId: z.uuid().optional(),
  isFavorite: z.boolean().optional(),
  isPinned: z.boolean().optional(),
});

const updateNoteSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(200, "Title cannot exceed 200 characters")
      .optional(),

    content: z
      .string()
      .max(50000, "Content cannot exceed 50000 characters")
      .nullable()
      .optional(),

    categoryId: z.uuid().optional(),

    isFavorite: z.boolean().optional(),

    isPinned: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

const noteIdSchema = z.object({
  id: z.uuid("Invalid note ID"),
});

const listNotesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  categoryId: z.uuid().optional(),

  search: z.string().trim().max(200).optional(),

  isFavorite: z.enum(["true", "false"]).optional(),

  isPinned: z.enum(["true", "false"]).optional(),
});

type CreateNoteInput = z.infer<typeof createNoteSchema>;
type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
type NoteIdInput = z.infer<typeof noteIdSchema>;
type ListNotesQuery = z.infer<typeof listNotesQuerySchema>;

export {
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
  listNotesQuerySchema,
};

export type { CreateNoteInput, UpdateNoteInput, NoteIdInput, ListNotesQuery };
