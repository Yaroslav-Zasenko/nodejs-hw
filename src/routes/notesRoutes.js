import { Router } from "express";
import { 
  getAllNotes, 
  createNote, 
  getNoteById,
  deleteNote,
  updateNote
} from "../controllers/notesController.js";

const router = Router();

// Маршрут для отримання всіх нотаток
router.get("/notes", getAllNotes);

// Створити нову нотатку
router.post("/notes", createNote);

// Отримати нотатку за її ID
router.get("/notes/:noteId", getNoteById);

// Оновити нотатку за її ID
router.patch("/notes/:noteId", updateNote);

// Видалити нотатку за її ID
router.delete("/notes/:noteId", deleteNote);

export default router;