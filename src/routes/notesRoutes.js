import { Router } from "express";
import { celebrate } from "celebrate";
import { 
  getAllNotesSchema, 
  noteIdSchema, 
  createNoteSchema, 
  updateNoteSchema 
} from "../validations/notesValidation.js";
import { 
  getAllNotes, 
  createNote, 
  getNoteById,
  deleteNote,
  updateNote
} from "../controllers/notesController.js";

const router = Router();

// Маршрут для отримання всіх нотаток (з валідацією query-параметрів)
router.get("/notes", celebrate(getAllNotesSchema), getAllNotes);

// Створити нову нотатку (з валідацією body)
router.post("/notes", celebrate(createNoteSchema), createNote);

// Отримати нотатку за її ID (з валідацією params.noteId)
router.get("/notes/:noteId", celebrate(noteIdSchema), getNoteById);

// Оновити нотатку за її ID (з валідацією params + body)
router.patch("/notes/:noteId", celebrate(updateNoteSchema), updateNote);

// Видалити нотатку за її ID (з валідацією params.noteId)
router.delete("/notes/:noteId", celebrate(noteIdSchema), deleteNote);

export default router;