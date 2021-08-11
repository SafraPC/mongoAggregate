require("dotenv/config");
const express = require("express");
const cors = require("cors");
const connection = require("./database/mongo");
const app = express();
const router = require("./routes");
//for db stay async
(async () => {
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  await connection();
  app.use(router);
  app.use((_, res) => {
    res.status(404).send({ message: "Rota não Encontrada!" });
  });
  app.listen(4000, () => {
    console.log("Server is Running on Port 4000");
  });
})();
