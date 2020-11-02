require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const compression = require("compression");

const port = process.env.PORT || 10000;
const nodeEnv = process.env.NODE_ENV;
const buildPath = path.join(__dirname, "..", "build");

const todosRouter = require("./routes/todos");

const app = express();

const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: false,
  })
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

app.use(compression());
app.use(bodyParser.json({ extends: false }));

if (nodeEnv === "production") {
  app.use(express.static(buildPath));
}

app.use("/api", todosRouter);

app.get("*", (req, res) => {
  res.end("resource could not be found");
});

app.listen(port, console.log("app is running on port: ", port));
