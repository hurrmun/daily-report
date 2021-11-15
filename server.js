//* Dependencies
require("dotenv").config();
const knex = require("./knex");
const path = require("path");
const express = require("express");
const testController = require("./controllers/testController");

//* Config
const app = express();
const PORT = 3001;

//* Middleware
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//* Middleware for controllers
app.use("/api/test", testController);

//* Routes Start

// app.get("/", (req, res) => {
//   res.send("helloooooo");
// });

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

// const test = async () => {
//   const result = await knex.select().from("test").where({ id: 1 });
//   console.log(result);
// };

// test();

//* Listener

app.listen(PORT, () => {
  console.log("serving on port: " + PORT);
});
