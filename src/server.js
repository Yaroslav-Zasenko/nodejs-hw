import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import notesRouter from "./routes/notesRoutes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { errors } from "celebrate";

// Створюємо екземпляр додатка
const app = express();

// Підключаємо базові middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Підключаємо наші роути для нотаток
app.use(notesRouter);

// Тестовий маршрут для імітації помилки сервера
app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

// 1. Middleware для обробки неіснуючих маршрутів (404)
app.use(notFoundHandler);

// 2. Перехоплення помилок валідації Celebrate (повертає 400 Bad Request)
app.use(errors());

// 3. Централізований обробник помилок (має бути ОСТАННІМ)
app.use(errorHandler);

// Зчитуємо порт та запускаємо сервер разом із базою даних
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();