import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { createNoteController } from "./notes.controller.js";

const router = Router();

// router.get('/');
router.post('/', authMiddleware, createNoteController);
// router.get('/:id');
// router.patch('/:id');
// router.delete('/:id');

export default router;