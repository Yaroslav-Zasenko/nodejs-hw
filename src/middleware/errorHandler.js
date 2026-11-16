import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Якщо це помилка, створена за допомогою http-errors
  if (isHttpError(err)) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  // Для всіх інших непередбачуваних помилок (500)
  res.status(500).json({
    message: 'Something went wrong',
  });
};