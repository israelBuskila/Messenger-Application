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

exports.getConversationByUsersName = (userA, userB) => {
  return new Promise((resolve, reject) => {
    Conversations.find(
      {
        $and: [
          { $or: [{ UserA: userA }, { UserA: userB }] },
          { $or: [{ UserB: userA }, { UserB: userB }] },
        ],
      },
      function (err, con) {
        if (err) {
          reject(err);
        } else {
          resolve(con);
        }
      }
    );
  });
};

exports.getConversationsByUserName = (userName) => {
  return new Promise((resolve, reject) => {
    Conversations.find(
      {
        $or: [{ UserA: userName }, { UserB: userName }],
      },
      function (err, con) {
        if (err) {
          reject(err);
        } else {
          resolve(con);
        }
      }
    );
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
    const p = new Conversations({
      UserA: obj.UserA,
      UserB: obj.UserB,
      Chat: obj.Chat,
      Type: obj.Type,
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
        UserA: obj.UserA,
        UserB: obj.UserB,
        Chat: obj.Chat,
        Type: obj.Type,
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
