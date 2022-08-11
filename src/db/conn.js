require("dotenv").config();
const mongoose = require("mongoose");
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const db_conn_url = `mongodb://${DB_USER_NAME}:${DB_PASSWORD}@ac-2relq0c-shard-00-00.of949mg.mongodb.net:27017,ac-2relq0c-shard-00-01.of949mg.mongodb.net:27017,ac-2relq0c-shard-00-02.of949mg.mongodb.net:27017/notes-backend?ssl=true&replicaSet=atlas-pr1dpn-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose
  .connect(db_conn_url)
  .then(() => {
    console.log("Connection to db successfull");
  })
  .catch((err) => console.log(err));
