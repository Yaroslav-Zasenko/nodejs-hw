import pinoHttp from 'pino-http';

export const logger = pinoHttp({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // Додає кольорове оформлення для зручності у консолі
    },
  },
});