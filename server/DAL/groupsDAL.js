const Groups = require("../models/GruopsModel");

exports.getAllGroups = function () {
  return new Promise((resolve, reject) => {
    Groups.find({}, function (err, groups) {
      if (err) {
        reject(err);
      } else {
        resolve(groups);
      }
    });
  });
};

exports.getGroupByTitle = (title) => {
  return new Promise((resolve, reject) => {
    Groups.find({ Title: title }, function (err, group) {
      if (err) {
        reject(err);
      } else {
        resolve(group);
      }
    });
  });
};

exports.getGroupById = function (id) {
  return new Promise((resolve, reject) => {
    Groups.findById(id, function (err, group) {
      if (err) {
        reject(err);
      } else {
        resolve(group);
      }
    });
  });
};

exports.addGroup = function (obj) {
  return new Promise((resolve, reject) => {
    const p = new UsersLogin({
      Title: obj.Title,
      Admins: obj.Admins,
      Participants: obj.Participants,
      Messages: bj.Messages,
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

exports.updateGroup = function (id, obj) {
  return new Promise((resolve, reject) => {
    Groups.findByIdAndUpdate(
      id,
      {
        Title: obj.Title,
        Admins: obj.Admins,
        Participants: obj.Participants,
        Messages: bj.Messages,
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

exports.deleteGroup = function (id) {
  return new Promise((resolve, reject) => {
    Groups.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !");
      }
    });
  });
};
