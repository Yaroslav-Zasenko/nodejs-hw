import express from "express";
import cors from "cors";
import pino from "pino-http";
import "dotenv/config";

// Створюємо екземпляр додатка
const app = express();

// Підключаємо middleware
app.use(cors());
app.use(express.json());
app.use(pino());

// Маршрут для отримання всіх нотаток
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Retrieved all notes",
  });
});

// Маршрут для отримання однієї нотатки за її ID
app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// Тестовий маршрут для імітації помилки сервера
app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

// Middleware для обробки неіснуючих маршрутів (404)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Централізований обробник помилок (500)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

// Зчитуємо порт із змінних середовища або використовуємо 3000 за замовчуванням
const PORT = process.env.PORT || 3000;

// Запускаємо сервер
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});