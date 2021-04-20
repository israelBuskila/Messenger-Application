const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ConversationsSchema = new Schema({
  UsersName: String,
  Chat: Array,
});

module.exports = mongoose.model("Conversations", ConversationsSchema);
