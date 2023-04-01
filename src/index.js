require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute");
const trackRoute = require("./routes/trackRoute");
const requireAuth = require("./middlewares/requireAuth");
const dotenv = require('dotenv');

const app = express();

app.use(bodyParser.json());
app.use(authRoute);
app.use(trackRoute);

dotenv.config();

const mongoUri = process.env.MONGO_URI;

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
