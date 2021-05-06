const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ConversationsSchema = new Schema({
  UserA: String,
  UserB: String,
  Chat: Array,
  Type: String,
  BlockedBy: Array,
});

module.exports = mongoose.model("Conversations", ConversationsSchema);
