import { Note } from "../models/note.js";

// Отримати всі нотатки
export const getNotesController = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      status: 200,
      message: "Successfully retrieved all notes!",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve notes",
      error: error.message,
    });
  }
};

// Створити нову нотатку
export const createNoteController = async (req, res) => {
  try {
    const newNote = await Note.create(req.body);

    res.status(201).json({
      status: 201,
      message: "Successfully created a note!",
      data: newNote,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Failed to create note",
      error: error.message,
    });
  }
};

export const getNoteByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        status: 404,
        message: 'Note not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found note with id: ${id}`,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNoteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // findByIdAndUpdate шукає за ID, оновлює тілом запиту (req.body)
    // { new: true } повертає вже оновлений документ, а { runValidators: true } перевіряє схему Mongoose
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      return res.status(404).json({
        status: 404,
        message: 'Note not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated a note!',
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNoteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // findByIdAndDelete шукає документ за ID і видаляє його з бази даних
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        status: 404,
        message: 'Note not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted a note!',
      data: deletedNote,
    });
  } catch (error) {
    next(error);
  }
};