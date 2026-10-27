import type { Request, Response } from "express";
import { createNoteSchema } from "./notes.schema.js";
import ApiError from "../../utils/ApiError";
import { createNote } from "./notes.service.js";

const createNoteController = async (req: Request, res: Response) => {
  const result = createNoteSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, "Invalid note data");
  }

  const userId = req.user!.id;

  const note = await createNote(userId, result.data);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: note,
  });
};

export { createNoteController };
