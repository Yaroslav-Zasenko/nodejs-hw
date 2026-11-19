import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

// Кастомний валідатор для перевірки MongoDB ObjectId у параметрах (params)
const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid note id');
  }
  return value;
};

// Схема для GET /notes (валідація рядка запиту query: пагінація, фільтр, пошук)
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS).optional(),
    search: Joi.string().trim().allow('').optional(),
  }),
};

// Схема для валідації noteId у параметрах (для GET /notes/:noteId та DELETE /notes/:noteId)
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

// Схема для POST /notes (валідація тіла запиту body при створенні нотатки)
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).required(),
    content: Joi.string().trim().allow('').optional(),
    tag: Joi.string().valid(...TAGS).optional(),
  }),
};

// Схема для PATCH /notes/:noteId (params + body, обов'язково хоча б 1 поле для оновлення)
export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).optional(),
    content: Joi.string().trim().allow('').optional(),
    tag: Joi.string().valid(...TAGS).optional(),
  }).min(1),
};