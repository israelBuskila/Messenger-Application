const UsersLogin = require("../models/UsersLoginModel");

exports.getAllUsersLogin = function () {
  return new Promise((resolve, reject) => {
    UsersLogin.find({}, function (err, pers) {
      if (err) {
        reject(err);
      } else {
        resolve(pers);
      }
    });
  });
};

exports.getUserByUserName = (userName) => {
  return new Promise((resolve, reject) => {
    UsersLogin.find({ UserName: userName }, function (err, pers) {
      if (err) {
        reject(err);
      } else {
        resolve(pers);
      }
    });
  });
};

exports.getUserLoginById = function (id) {
  return new Promise((resolve, reject) => {
    UsersLogin.findById(id, function (err, per) {
      if (err) {
        reject(err);
      } else {
        resolve(per);
      }
    });
  });
};

exports.addUserLogin = function (obj) {
  return new Promise((resolve, reject) => {
    const p = new UsersLogin({
      UserName: obj.UserName,
      Password: obj.Password,
    });

    p.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.UserName);
      }
    });
  });
};

exports.updateUserLogin = function (id, obj) {
  return new Promise((resolve, reject) => {
    UsersLogin.findByIdAndUpdate(
      id,
      {
        UserName: obj.UserName,
        Password: obj.Password,
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

exports.deleteUsersLogin = function (id) {
  return new Promise((resolve, reject) => {
    UsersLogin.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !");
      }
    });
  });
};
