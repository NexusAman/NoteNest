import type { Request, Response } from "express";
import {
  createNoteSchema,
  listNotesQuerySchema,
  noteIdSchema,
  updateNoteSchema,
} from "./notes.schema.js";
import ApiError from "../../utils/ApiError.js";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "./notes.service.js";

const createNoteController = async (req: Request, res: Response) => {
  const result = createNoteSchema.safeParse(req.body);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    });

    throw new ApiError(400, "Invalid note data", errors);
  }

  const userId = req.user!.id;

  const note = await createNote(userId, result.data);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: note,
  });
};

const getNotesController = async (req: Request, res: Response) => {
  const result = listNotesQuerySchema.safeParse(req.query);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    });

    throw new ApiError(400, "Invalid query parameters", errors);
  }
  const userId = req.user!.id;

  const notes = await getNotes(userId, result.data);

  res.status(200).json({
    success: true,
    data: notes,
  });
};

const getNoteByIdController = async (req: Request, res: Response) => {
  const params = noteIdSchema.safeParse(req.params);

  if (!params.success) {
    throw new ApiError(400, "Invalid Note ID");
  }

  const userId = req.user!.id;

  const note = await getNoteById(userId, params.data);

  res.status(200).json({
    success: true,
    data: note,
  });
};

const updateNoteController = async (req: Request, res: Response) => {
  const params = noteIdSchema.safeParse(req.params);

  if (!params.success) {
    throw new ApiError(400, "Invalid note ID");
  }

  const body = updateNoteSchema.safeParse(req.body);

  if (!body.success) {
    const errors: Record<string, string> = {};

    body.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    });

    throw new ApiError(400, "Invalid inputs", errors);
  }

  const userId = req.user!.id;

  const note = await updateNote(userId, params.data, body.data);

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note,
  });
};

const deleteNoteController = async (req: Request, res: Response) => {
  const params = noteIdSchema.safeParse(req.params);

  if (!params.success) {
    throw new ApiError(400, "Invalid note ID");
  }

  const userId = req.user!.id;

  await deleteNote(userId, params.data);

  res.status(204).send();
};

export {
  createNoteController,
  getNotesController,
  getNoteByIdController,
  updateNoteController,
  deleteNoteController,
};
