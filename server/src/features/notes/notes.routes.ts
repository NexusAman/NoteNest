import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  createNoteController,
  deleteNoteController,
  getNoteByIdController,
  getNotesController,
  updateNoteController,
} from "./notes.controller.js";

const router = Router();

router.get("/", authMiddleware, getNotesController);
router.post("/", authMiddleware, createNoteController);
router.get("/:id", authMiddleware, getNoteByIdController);
router.patch("/:id", authMiddleware, updateNoteController);
router.delete("/:id", authMiddleware, deleteNoteController);

export default router;
