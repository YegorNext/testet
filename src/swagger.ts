import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation for KARMA Setup Panel',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: `${process.env.PROTOCOL}://${process.env.DOMAIN}${process.env.PROTOCOL === 'https' ? '' : ':' + process.env.PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
