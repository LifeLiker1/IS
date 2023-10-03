const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // Версия Swagger/OpenAPI
    info: {
      title: "Ваше API",
      version: "1.0.0",
      description: "Описание вашего API",
    },
  },
  apis: ["./routes/*.js"], // Путь к файлам с маршрутами
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
