/* Created by Roberto Aleydon */

const express = require("express");
const app = express();
const PORT = 3333;

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Server Work!!!");
});

app.listen(PORT, (req, res) => {
  return console.log(`Server running on port ${PORT}`);
});
