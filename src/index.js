require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoute);

const mongoUri = MONGO_URI;

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("connection mongo success");
});

mongoose.connection.on("error", (err) => {
  console.error("connection mongo failed", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`email: ${req.user.password}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
