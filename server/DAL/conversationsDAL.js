const Conversations = require("../models/ConversationsModel");

exports.getAllConversations = function () {
  return new Promise((resolve, reject) => {
    Conversations.find({}, function (err, con) {
      if (err) {
        reject(err);
      } else {
        resolve(con);
      }
    });
  });
};

exports.getConversationByUserName = (userName) => {
  return new Promise((resolve, reject) => {
    Conversations.find({ UserName: userName }, function (err, con) {
      if (err) {
        reject(err);
      } else {
        resolve(con);
      }
    });
  });
};

exports.getConversationById = function (id) {
  return new Promise((resolve, reject) => {
    Conversations.findById(id, function (err, con) {
      if (err) {
        reject(err);
      } else {
        resolve(con);
      }
    });
  });
};

exports.addConversation = function (obj) {
  return new Promise((resolve, reject) => {
    const p = new UsersLogin({
      UserName: obj.UserName,
      Chats: obj.Chats,
    });

    p.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.updateConversation = function (id, obj) {
  return new Promise((resolve, reject) => {
    Conversations.findByIdAndUpdate(
      id,
      {
        UserName: obj.UserName,
        Chats: obj.Chats,
      },
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve("Updated !");
        }
      }
    );
  });
};

exports.deleteConversation = function (id) {
  return new Promise((resolve, reject) => {
    Conversations.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !");
      }
    });
  });
};
