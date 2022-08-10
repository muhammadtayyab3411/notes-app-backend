const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mynotes")
  .then(() => {
    console.log("Connection to db successfull");
  })
  .catch((err) => console.log(err));
