const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Job Board API',
      version: '1.0.0',
      description: 'API documentation for the Mini Job Board backend',
    },
    servers: [
      {
        url: 'https://job-portal-63en.onrender.com/api', 
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'], // Correct route path
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;