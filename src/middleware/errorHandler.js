import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Якщо це помилка, створена за допомогою http-errors
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  // Для всіх інших непередбачуваних помилок (наприклад, збої БД)
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message, // Використовуємо err.message замість err.stack
  });
};