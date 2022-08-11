require("dotenv").config();
const mongoose = require("mongoose");
const DBUSERNAME = process.env.DBUSERNAME;
const DBPASSWORD = process.env.DBPASSWORD;

const db_conn_url = `mongodb://${DBUSERNAME}:${DBPASSWORD}@ac-2relq0c-shard-00-00.of949mg.mongodb.net:27017,ac-2relq0c-shard-00-01.of949mg.mongodb.net:27017,ac-2relq0c-shard-00-02.of949mg.mongodb.net:27017/notes-backend?ssl=true&replicaSet=atlas-pr1dpn-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose
  .connect(
    `mongodb+srv://muhammadtayyab3411:Tayyab3411@cluster0.u0qzywf.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connection to db successfull");
  })
  .catch((err) => console.log(err));
