const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let GroupsSchema = new Schema({
  Title: String,
  Admins: Array,
  Participants: Array,
  Messages: Array
});

module.exports = mongoose.model("Groups", GroupsSchema);