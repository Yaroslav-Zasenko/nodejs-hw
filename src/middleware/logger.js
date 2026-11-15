import pinoHttp from 'pino-http';

export const logger = pinoHttp({
  transport:
    process.env.NODE_ENV === 'production'
      ? undefined // У продакшні (на Render) транспорт не використовуємо
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
});