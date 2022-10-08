require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn"); // connect to db
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user = require("./routes/user");
const notes = require("./routes/notes");
const session = require("express-session");

const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: "session",
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: "lux",
      secure: true,
    },
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
