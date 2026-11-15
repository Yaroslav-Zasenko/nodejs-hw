import { Router } from "express";
import { 
  getNotesController, 
  createNoteController, 
  getNoteByIdController,
  updateNoteController,
  deleteNoteController 
} from "../controllers/notesControllers.js";

const router = Router();

// Маршрут для отримання всіх нотаток
router.get("/notes", getNotesController);

// Створити нову нотатку
router.post("/notes", createNoteController);

// Отримати нотатку за її ID
router.get("/notes/:id", getNoteByIdController);

// Оновити нотатку за її ID
router.patch("/notes/:id", updateNoteController);

// Видалити нотатку за її ID
router.delete("/notes/:id", deleteNoteController);

export const notesRouter = router;