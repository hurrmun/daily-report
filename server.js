//* Dependencies
require("dotenv").config({ path: "./config.env" });
const path = require("path");
const express = require("express");
// const testController = require("./controllers/testController");

//* Config
const app = express();
const PORT = process.env.PORT || 5000;

//* Middleware
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });

//* Middleware for controllers (+ dependency in require)
// app.use("/api/test", testController);
app.use("/api/auth", require("./routes/auth"));

//* Routes Start

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

//* Listener
app.listen(PORT, () => {
  console.log("serving on port: " + PORT);
});
