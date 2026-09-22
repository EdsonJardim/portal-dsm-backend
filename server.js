require("dotenv").config();

const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./src/routes/usuarioRoutes");
const cursoRoutes = require("./src/routes/cursoRoutes");

const app = express();

const PORTA = process.env.PORTA || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend do Portal DSM funcionando!");
});

app.use("/", usuarioRoutes);
app.use("/", cursoRoutes);

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});