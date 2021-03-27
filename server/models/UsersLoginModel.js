const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UsersLoginSchema = new Schema({
  UserName: String,
  Password: String,
});

module.exports = mongoose.model("userslogin", UsersLoginSchema);
