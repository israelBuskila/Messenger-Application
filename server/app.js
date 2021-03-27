const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const usersLoginRoutes = require("./routes/usersLogin");

//DB
require("./configs/database");
//init db

// configure the body-parser
// to accept urlencoded bodies
// and json data
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
//just for first time

app.use("/", usersLoginRoutes);

app.listen(3001);
