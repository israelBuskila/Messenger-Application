const conversationsDAL = require("../DAL/conversationsDAL");
const usersLoginDAL = require("../DAL/usersLoginDAL");

exports.initforNewUser = async (username) => {
  let users = await usersLoginDAL.getAllUsersLogin();
  var t = new Date();
  var time =
    t.getDate() +
    "/" +
    (t.getMonth() + 1) +
    "/" +
    t.getFullYear() +
    "  " +
    t.getHours() +
    ":" +
    t.getMinutes();
  users.forEach(async (x) => {
    let obj = {
      UserA: username,
      UserB: x.UserName,
      Chat: [
        {
          Sender: username,
          Message: "Say hello to your friend",
          Addressee: x.UserName,
          TimeStamp: time,
        },
      ],
    };
    await conversationsDAL.addConversation(obj);
  });
};
