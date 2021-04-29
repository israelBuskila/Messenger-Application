const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UsersLoginSchema = new Schema({
  FirstName: String,
  LastName: String,
  UserName: String,
  Password: String,
  LastMessage: String,
  Groups: Array,
  Blocked: Array,
  BlockedBy: Array,
});

module.exports = mongoose.model("userslogin", UsersLoginSchema);
