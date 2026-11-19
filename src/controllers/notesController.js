import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// 1. Отримати всі нотатки з пагінацією, фільтрацією та пошуком
export const getAllNotes = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const { tag, search } = req.query;

    const filter = {};

    if (tag) {
      filter.tag = tag;
    }

    if (search && search.trim()) {
      const trimmedSearch = search.trim();
      filter.$or = [
        { title: { $regex: trimmedSearch, $options: 'i' } },
        { content: { $regex: trimmedSearch, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * perPage;

    const [totalNotes, notes] = await Promise.all([
      Note.countDocuments(filter),
      Note.find(filter).skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page,
      perPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Отримати нотатку за ID
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      return next(createHttpError(404, 'Note not found'));
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// 3. Створити нову нотатку (повертає об'єкт нотатки без обгортки)
export const createNote = async (req, res, next) => {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// 4. Оновити нотатку за ID
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedNote) {
      return next(createHttpError(404, 'Note not found'));
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// 5. Видалити нотатку за ID
export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return next(createHttpError(404, 'Note not found'));
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};