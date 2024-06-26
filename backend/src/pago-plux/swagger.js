const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { envs } = require("../config/enviroments/enviroments");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pago Plux API",
      version: "1.0.0",
    },
  },
  apis: ["src/pago-plux/pagoplux.route.js", "src/config/database/database.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Documentacion de la primera version disponible en http://localhost:${envs.PORT}/api/v1/docs`
  );
};

module.exports = { swaggerDocs };
