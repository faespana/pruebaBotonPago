const app = require("./app");
const { authenticated, syncUp } = require("./config/database/database");
const { envs } = require("./config/enviroments/enviroments");
const { swaggerDocs: V1SwaggerDocs } = require("./pago-plux/swagger");

async function main() {
  try {
    await authenticated();
    await syncUp();
  } catch (error) {
    console.log(error);
  }
}

main();

app.listen(envs.PORT, () => {
  console.log("Server running on port: " + envs.PORT);
  V1SwaggerDocs(app, envs.PORT);
});
