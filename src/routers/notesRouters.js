import { Router } from "express";
import { 
  getNotesController, 
  createNoteController, 
  getNoteByIdController,
  deleteNoteController,
  updateNote
} from "../controllers/notesControllers.js";

const router = Router();

// Маршрут для отримання всіх нотаток
router.get("/notes", getNotesController);

// Створити нову нотатку
router.post("/notes", createNoteController);

// Отримати нотатку за її ID
router.get("/notes/:id", getNoteByIdController);

// Оновити нотатку за її ID (згідно з останнім завданням)
router.patch("/notes/:noteId", updateNote);

// Видалити нотатку за її ID
router.delete("/notes/:id", deleteNoteController);

export const notesRouter = router;