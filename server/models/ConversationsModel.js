const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ConversationsSchema = new Schema({
  UserA: String,
  UserB: String,
  Chat: Array,
  Type: String,
});

module.exports = mongoose.model("Conversations", ConversationsSchema);
