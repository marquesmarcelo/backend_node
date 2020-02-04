const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'REST API para minha aplicação', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'Esta é um projeto de teste utilizando várias tecnologias node.js', // short description of the app
  },
  host: 'localhost:3000', // the host or url of the app
  basePath: '/api', // the basepath of your endpoint
  /*
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  */
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  //apis: ['./docs/*.yaml'],
  apis: ['./src/app/routes/*.js'],  
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);