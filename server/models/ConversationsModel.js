const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ConversationsSchema = new Schema({
  UserName: String,
  Chats: Array,
});

module.exports = mongoose.model("Conversations", ConversationsSchema);
