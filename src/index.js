require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn"); // connect to db
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user = require("./routes/user");
const notes = require("./routes/notes");

const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Routes
app.use("/user", user);
app.use("/notes", notes);

app.get("/", (req, res) => {
  res.send("hello from notes backend");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
