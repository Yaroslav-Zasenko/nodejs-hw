import express from "express";
import cors from "cors";
import pino from "pino-http";
import "dotenv/config";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { notesRouter } from "./routers/notesRouters.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Створюємо екземпляр додатка
const app = express();

// Підключаємо базові middleware
app.use(cors());
app.use(express.json());
app.use(pino());

// Підключаємо наші роути для нотаток
app.use(notesRouter);

// Тестовий маршрут для імітації помилки сервера
app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

// 1. Middleware для обробки неіснуючих маршрутів (404)
app.use(notFoundHandler);

// 2. Централізований обробник помилок (має бути ОСТАННІМ)
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