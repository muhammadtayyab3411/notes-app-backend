require("dotenv").config();
const mongoose = require("mongoose");
const DBUSERNAME = process.env.DBUSERNAME;
const DBPASSWORD = process.env.DBPASSWORD;

// const db_conn_url = `mongodb://${DBUSERNAME}:${DBPASSWORD}@ac-2relq0c-shard-00-00.of949mg.mongodb.net:27017,ac-2relq0c-shard-00-01.of949mg.mongodb.net:27017,ac-2relq0c-shard-00-02.of949mg.mongodb.net:27017/notes-backend?ssl=true&replicaSet=atlas-pr1dpn-shard-0&authSource=admin&retryWrites=true&w=majority`;

const db_conn_uri = `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@cluster0.u0qzywf.mongodb.net/notes?retryWrites=true&w=majority`;
// const db_conn_uri = "mongodb://localhost:27017/users";

mongoose
  .connect(db_conn_uri)
  .then(() => {
    console.log("Connection to db successfull");
  })
  .catch((err) => console.log(err));
