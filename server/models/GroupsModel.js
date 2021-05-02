const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let GroupsSchema = new Schema({
  Title: String,
  Admins: Array,
  Members: Array,
  Chat: Array,
  Type: String,
});

module.exports = mongoose.model("Groups", GroupsSchema);
