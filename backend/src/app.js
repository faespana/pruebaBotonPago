const express = require("express");
const cors = require("cors");
const pagoPlux = require("./pago-plux/pagoplux.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use("/api/v1", pagoPlux);

module.exports = app;
