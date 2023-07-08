require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

// // solve CORS
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:3000", "http://orangerie.com.br"],
//   })
// );

// solve CORS
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

// config JSON and form data response (para receber as imagens tbm)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB connection
require("./config/db.js");

// routes
const router = require("./routes/Router");

app.use(router);

app.listen(port, () => {
  console.log(`Bippp, rodando em ${port} com sucesso`);
});
